SirTrevor.Blocks.List = (function () {

    var template = _.template([
    '<div>',
        '<div class="st-text-block st-required" contenteditable="true"><ul><li></li></ul></div>',
        '<div class="st-block__control-ui">',
            '<select class="st-list--dropdown st-block-control-ui-btn" style="background-color:inherit;color:black;width:7.5em;height:2.5em;font-size:1em;">',
                '<option value="">universal</option>',
                '<option value="alphabet">alphabetical</option>',
            '</select>',
        '</div>',
    '</div>'
    ].join("\n"));

    return SirTrevor.Block.extend({

        type: 'list',

        title: "List",

        icon_name: 'list',

        editorHTML: function () {
            return template(this);
        },

        loadData: function (data) {
            this.getTextBlock().html("<ul>" + SirTrevor.toHTML(data.text, this.type) + "</ul>");

            // - set dropdown to selected value
            var optionitem = this.$el.find(".st-list--dropdown option").filter(function () {
                return (($(this).val() == data.type) || ($(this).text() == data.type))
            });
            optionitem.prop("selected", true);
        },

        onBlockRender: function () {
            // - hook up the dropdown
            var ddel = this.$el.find(".st-list--dropdown");
            ddel.on("change", {
                dropdown: ddel,
                block: this
            }, function (e) {
                $(e.data.dropdown).find("option:selected").each(function () {
                    var data = {};
                    data.type = $(this).val();

                    if (data.type == "") {
                        // remove prop from obj if empty (="universal")
                        data.type = undefined;
                    }

                    e.data.block.setData(data);
                });
            });

            this.checkForList = _.bind(this.checkForList, this);
            this.getTextBlock().on('click keyup', this.checkForList);
        },

        checkForList: function () {
            if (this.$('ul').length === 0) {
                document.execCommand("insertUnorderedList", false, false);
            }
        },

        toMarkdown: function (markdown) {
            return markdown.replace(/<\/li>/mg, "\n")
                           .replace(/<\/?[^>]+(>|$)/g, "")
                           .replace(/^(.+)$/mg, " - $1");
        },

        toHTML: function (html) {
            html = html.replace(/^ - (.+)$/mg, "<li>$1</li>")
                       .replace(/\n/mg, "");

            return html;
        },

        onContentPasted: function (event, target) {
            var replace = this.pastedMarkdownToHTML(target[0].innerHTML),
                list = this.$('ul').html(replace);

            this.getTextBlock().caretToEnd();
        },

        isEmpty: function () {
            return _.isEmpty(this.saveAndGetData().text);
        }

    });

})();
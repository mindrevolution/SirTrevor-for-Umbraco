/*
  Extended Heading Block by mindrevolution
*/

SirTrevor.Blocks.Heading = (function () {

    var template = _.template([
    '<div>',
        '<div class="st-required st-text-block st-text-block--heading" contenteditable="true"></div>',
        '<div class="st-block__control-ui">',
            buildHeadingsDropdown(),
        '</div>',
    '</div>'
    ].join("\n"));

    function getHeadingsDropdown(e) {
        this.setHeadingSize(2);
    }

    function buildHeadingsDropdown() {
        var headings = new Array();

        for (var i = 1; i <= 6; i++) {
            headings.push('<option value="h' + i + '">Heading ' + i + '</option>');
        }

        return '<select class="st-extended-heading--dropdown st-block-control-ui-btn" style="background-color:inherit;color:black;width:7.5em;height:2.5em;font-size:1em;"><option value="">universal</option>' + headings.join("") + '</select>'
    }

    return SirTrevor.Block.extend({

        type: 'Heading',
        title: function () { return i18n.t('blocks:heading:title'); },
        icon_name: 'heading',

        editorHTML: function () {
            return template(this);
        },

        loadData: function (data) {
            this.getTextBlock().html(SirTrevor.toHTML(data.text, this.type));

            // - set dropdown to selected value
            this.$el.find(".st-extended-heading--dropdown option").filter(function () {
                return (($(this).val() == data.type) || ($(this).text() == data.type))
            }).prop("selected", true);
        },

        onBlockRender: function(data) {
            // - hook up the dropdown
            var ddel = this.$el.find(".st-extended-heading--dropdown");
            ddel.on("change", {
                dropdown: ddel,
                block: this
            }, function (e) {
                $(e.data.dropdown).find("option:selected").each(function () {
                    var data = {};
                    data.text = SirTrevor.toMarkdown(e.data.block.getTextBlock().html());
                    data.type = $(this).val();

                    if (data.type == "") {
                        // remove prop from obj if empty (="universal")
                        data.type = undefined;
                    }

                    e.data.block.setAndLoadData(data);
                    e.data.block.ready();
                });
            });
        },

    });

})();

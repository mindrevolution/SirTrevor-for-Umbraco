/*
  Umbraco Embedded Block by mindrevolution
*/

SirTrevor.Blocks.UmbracoEmbedded = (function () {

    var thisblock;

    return SirTrevor.Block.extend({

        type: "umbraco_embedded",
        title: function () { return "Embedded Media"; },

        droppable: false,
        uploadable: false,
        pastable: false,
        ajaxable: false,

        icon_name: "iframe",

        loadData: function (data) {
            this.$editor.html(data.markup);
        },  

        onBlockRender: function () {
            // - block has no img src value, must be a new one, so oben the media library ...
            if (typeof this.blockStorage.data.markup === "undefined") {
                // - preserve current scope for callback 'onMediaSelected'
                thisblock = this;
                // - show media library and allow selection of an image/media (for now)
                angular.element("body").injector().get("dialogService").embedDialog({ callback: this.onMediaSelected });
            }
        },

        onMediaSelected: function (e) {
            var embed = {};
            embed.markup = e;

            console.log("embedded data", embed);

            thisblock.$editor.html(embed.markup);
            thisblock.setAndLoadData(embed);
            thisblock.ready();
        }

    });

})();
/*
  Umbraco Media Image Block by mindrevolution
*/

SirTrevor.Blocks.UmbracoThirdPartyMedia = (function () {

    var thisblock;

    return SirTrevor.Block.extend({

        type: "umbraco_third_party_media",
        title: function() { return "3rd Party Media"; },

        droppable: false,
        uploadable: false,
        pastable: false,
        ajaxable: false,

        icon_name: "video",

        loadData: function(data) {

            this.$editor.html(data.markup);
        },

        onBlockRender: function () {
            // - block has no img src value, must be a new one, so oben the media library ...
            if (typeof this.blockStorage.data.value === "undefined") {
                // - preserve current scope for callback 'onMediaSelected'
                thisblock = this;
                // - show media library and allow selection of an image/media (for now)
                angular.element("body").injector().get("dialogService").embedDialog({ callback: this.onMediaSelected });
            }
        },

        onMediaSelected: function (e) {

					var embed ={};
					embed.markup = e;
                    thisblock.$editor.html(embed.markup);
                    thisblock.setAndLoadData(embed);
                    thisblock.ready();

        }

    });

})();

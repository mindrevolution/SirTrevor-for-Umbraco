/*
  Umbraco Media Image Block by mindrevolution
*/

SirTrevor.Blocks.UmbracoImage = (function () {

    var thisblock;

    return SirTrevor.Block.extend({

        type: "umbraco_image",
        title: function() { return "Image"; },

        droppable: false,
        uploadable: false,
        pastable: false,
        ajaxable: false,

        icon_name: "image",

        loadData: function(data) {
            // - write image tag
            this.$editor.html($('<img>', { src: data.value }));
        },

        onBlockRender: function () {
            // - block has no img src value, must be a new one, so oben the media library ...
            if (typeof this.blockStorage.data.value === "undefined") {
                // - preserve current scope for callback 'onMediaSelected'
                thisblock = this;
                // - show media library and allow selection of an image/media (for now)
                angular.element("body").injector().get("dialogService").mediaPicker({ callback: this.onMediaSelected });
            }
        },

        onMediaSelected: function (e) {
            angular.forEach(e.properties, function (data, key) {
                if (data.alias == "umbracoFile") {
                    thisblock.$editor.html($("<img>", { src: data.value }));
                    thisblock.setAndLoadData(data);
                    thisblock.ready();
                }
            });
        }

    });

})();

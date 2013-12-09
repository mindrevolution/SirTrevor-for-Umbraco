/*
  Umbraco Media Image Block by mindrevolution
*/

SirTrevor.Blocks.UmbracoMedia = (function () {

    var thisblock;

    return SirTrevor.Block.extend({

        type: "umbraco_media",
        title: function() { return "Media"; },

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
            // - preserve current scope for callback 'onMediaSelected'
            thisblock = this;
            // - show media library and allow selection of an image/media (for now)
            angular.element("body").injector().get("dialogService").mediaPicker({ callback: this.onMediaSelected });

            console.log("onBlockRender");
        },

        onMediaSelected: function (e) {
            angular.forEach(e.properties, function (data, key) {
                if (data.alias == "umbracoFile") {
                    //console.log("selected media", mediafile)
                    thisblock.$editor.html($("<img>", { src: data.value }));
                    thisblock.setAndLoadData(data);
                    thisblock.ready();
                }
            });
        }

    });

})();

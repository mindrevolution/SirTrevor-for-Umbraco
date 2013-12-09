/*
  Umbraco Media Image Block by mindrevolution
*/

SirTrevor.Blocks.UmbracoMedia = (function(){

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
            this.$editor.html($("<img>", { src: data.file.url }))
        },

        editorHTML: function () {
            // - show media library and allow selection of an image/media (for now)
            angular.element("body").injector().get("dialogService").mediaPicker({ callback: this.onMediaSelected });
        },

        onBlockRender: function () {
        },

        onMediaSelected: function (e) {
            var mediafile;

            angular.forEach(e.properties, function (data, key) {
                if (data.alias == "umbracoFile") {
                    mediafile = data.value;
                    console.log("selected media", mediafile)
                }
            });
            // need to glue this together, without a proper "this" ;)
            //$editor.html($("<img>", { src: mediafile }))
        }

    });

})();

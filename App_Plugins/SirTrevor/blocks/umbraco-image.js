/*
  Umbraco Media Image Block by mindrevolution
*/

SirTrevor.Blocks.UmbracoImage = (function () {

    // - umbraco ng references
    var uImageHelper = angular.element("body").injector().get("imageHelper");
    var uDialogService = angular.element("body").injector().get("dialogService");
    var uMediaResource = angular.element("body").injector().get("mediaResource");

    var block;

    return SirTrevor.Block.extend({

        type: "umbraco_image",
        title: function() { return "Image"; },

        droppable: false,
        uploadable: false,
        pastable: false,
        ajaxable: false,

        icon_name: "image",

        loadData: function (data) {
            block = this; // - unify context
            //block.$editor.html($("<img>", { src: "/media/1008/ae8b059314150b6791414ac4856cfdfb3ce0e4d7ab87da0c2ce34f57a22d9205_big-thumb.jpg", class: "ust-previewimg" }));
            console.log("data", data);
            console.log("current block - load", block);
            block.setImage(data.id);
        },

        onBlockRender: function () {
            // - block has no img src value, must be a new one, so open the media library ...
            if (typeof this.blockStorage.data.id === "undefined") {
                // - preserve current scope for callback 'onMediaSelected'
                block = this;
                console.log("current block - render", block);

                // - show media library and allow selection of an image/media (for now)
                uDialogService.mediaPicker({ callback: this.onMediaSelected });
            }
        },

        onMediaSelected: function (e) {
            var media = {};
            media.id = e.id;
            media.contentTypeAlias = e.contentTypeAlias;
            console.log("current block - mediaselect", block);
            // - save media data
            console.log("setAndLoadData", media);
            block.setAndLoadData(media);
            block.ready();
        },

        setImage: function (mediaid) {
            // - preserve current scope for mediaResource callback
            var scope = block;

            //- fetch media (request intensive, but works for now)
            uMediaResource.getById(mediaid)
            .then(function (media) {
                var thumburl = uImageHelper.getThumbnailFromPath(uImageHelper.getImagePropertyValue({ imageModel: media }));

                scope.$editor.html($("<img>", { src: thumburl, class: "ust-previewimg" }));
                console.log("setimage", mediaid, media, thumburl, block);
            });
        }

    });

})();

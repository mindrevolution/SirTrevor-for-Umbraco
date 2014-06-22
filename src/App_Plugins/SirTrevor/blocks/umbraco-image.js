/*
  Umbraco Media Image Block by mindrevolution
*/

SirTrevor.Blocks.UmbracoImage = (function () {

    // - umbraco ng references
    var ngi = angular.element("body").injector();
    var uMediaHelper = ngi.get("mediaHelper");
    var uDialogService = ngi.get("dialogService");
    var uMediaResource = ngi.get("mediaResource");

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
            block.setImage(data.id);
        },

        onBlockRender: function () {
            // - block has no img src value, must be a new one, so open the media library ...
            if (typeof this.blockStorage.data.id === "undefined") {
                // - preserve current scope for callback 'onMediaSelected'
                block = this;

                // - show media library and allow selection of an image/media (for now)
                uDialogService.mediaPicker({ onlyImages: true, callback: this.onMediaSelected });
            }
        },

        onMediaSelected: function (e) {
            var media = {};
            media.id = e.id;
            media.contentTypeAlias = e.contentTypeAlias;

            // - save media data
            block.setAndLoadData(media);
            block.ready();
        },

        setImage: function (mediaid) {
            // - preserve current scope for mediaResource callback
            var scope = block;

            //- fetch media (request intensive, but works for now)
            uMediaResource.getById(mediaid)
            .then(function (media) {
                var thumburl = uMediaHelper.resolveFile(media, true);

                scope.$editor.html($("<img>", { src: thumburl, class: "ust-previewimg" }));
            });
        }

    });

})();

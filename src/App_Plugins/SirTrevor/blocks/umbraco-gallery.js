/*
  Umbraco Media Image Gallery Block by mindrevolution
*/

SirTrevor.Blocks.UmbracoGallery = (function () {

    // - umbraco ng references
    var ngi = angular.element("body").injector();
    var uImageHelper = ngi.get("imageHelper");
    var uDialogService = ngi.get("dialogService");
    var uMediaResource = ngi.get("mediaResource");

    var block;

    function pickImagesHandler(ev) {
        ev.preventDefault();
        this.pickImages();
    }

    return SirTrevor.Block.extend({

        type: "umbraco_gallery",
        title: function () { return "Gallery"; },
        icon_name: "poll",

        droppable: false,
        uploadable: false,
        pastable: false,
        ajaxable: false,
        controllable: true,

        controls: {
            "add": pickImagesHandler
        },

        loadData: function (data) {
            block = this; // - unify context

            this.$editor.empty(); // - get rid of existing gallery
            this.$editor.append($("<div>", { class: "ust-gallery" }));

            angular.forEach(data.items, function (item, index) {
                block.addImage(item.id);
            });
        },

        onBlockRender: function () {
            // - block has no img src value, must be a new one, so open the media library ...
            if (typeof this.blockStorage.data.itemcount === "undefined" || this.blockStorage.data.itemcount < 1) {
                // - preserve current scope for callback 'onMediaSelected'
                block = this;

                // - show media library and allow selection of multiple images
                this.pickImages();
            }
        },

        pickImages: function () {
            uDialogService.mediaPicker({ onlyImages: true, callback: this.onMediaSelected, multiPicker: true });
        },

        onMediaSelected: function (e) {
            var items = [];

            angular.forEach(block.$editor.find(".ust-gallery .ust-gallery-preview"), function (galleryitem, index) {
                var item = {};
                item.id = $(galleryitem).data("mediaid");
                item.contentTypeAlias = $(galleryitem).data("mediacontenttypealias");
                items.push(item);
            });

            angular.forEach(e, function (mediaitem, index) {
                var item = {};
                item.id = mediaitem.id;
                item.contentTypeAlias = mediaitem.contentTypeAlias;
                items.push(item);
            });

            // - save gallery items
            var gallery = {};
            gallery.itemcount = items.length;
            gallery.items = items;
            block.setAndLoadData(gallery);
            block.ready();
        },

        addImage: function (mediaid) {
            // - preserve current scope for mediaResource callback
            var scope = block;

            // - add placeholder for awaited image (css background)
            var preview = $("<div>", { class: "ust-gallery-preview", "data-mediaid": mediaid });
            //preview.append($("<a>", { class: "st-icon st-block-control-ui-btn st-block-control-ui-btn--delete", "style": "position:relative;" }));
            preview.append('<a data-icon="bin" class="st-block-ui-btn st-block-ui-btn--delete st-icon">delete</a>');

            scope.$editor.find(".ust-gallery").append(preview);

            //- fetch media (request intensive, but works for now)
            uMediaResource.getById(mediaid)
            .then(function (media) {
                var mel = scope.$editor.find(".ust-gallery-preview[data-mediaid='" + mediaid + "']");
                var thumburl = uImageHelper.getThumbnailFromPath(uImageHelper.getImagePropertyValue({ imageModel: media }));
                //style: "background-image:url(" + thumburl + ");"
                // - set image as background
                $(mel).css("background-image", "url(" + thumburl + ")");
                // - add media item's doc type alias
                $(mel).data("mediacontenttypealias", media.contentTypeAlias);
            });
        }

    });

})();

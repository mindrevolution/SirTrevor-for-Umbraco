/*
  Umbraco Media Image Gallery Block by mindrevolution
*/

SirTrevor.Blocks.UmbracoGallery = (function () {

    // - umbraco ng references
    var ngi = angular.element("body").injector();
    var uMediaHelper = ngi.get("mediaHelper");
    var uDialogService = ngi.get("dialogService");
    var uMediaResource = ngi.get("mediaResource");

    var block;

    return SirTrevor.Block.extend({

        type: "umbraco_gallery",
        title: function () { return "Gallery"; },
        icon_name: "image",

        droppable: false,
        uploadable: false,
        pastable: false,
        ajaxable: false,
        controllable: true,

        controls: {
            "add": function (ev) {
                block = this; // - easy context
                ev.preventDefault();
                this.pickImages();
            }
        },

        loadData: function (data) {
            block = this; // - easy context

            this.$editor.empty(); // - get rid of existing gallery
            this.$editor.append($("<ol>", { class: "ust-gallery" })); // ui-sortable

            angular.forEach(data.items, function (item, index) {
                block.addImage(item.id);
            });

            // - wire up delete button
            $(this.$editor).find(".ust-gallery").on("click", ".st-block-ui-btn--delete", function () {
                //console.log("delete gallery item", this, $(this).parent("li"));
                $(this).parent("li").remove();
                block.onMediaChanged();
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
            uDialogService.mediaPicker({ onlyImages: true, callback: this.onMediaChanged, multiPicker: true });
        },

        onMediaChanged: function (e) {
            var items = [];

            angular.forEach(block.$editor.find(".ust-gallery .ust-gallery-preview"), function (galleryitem, index) {
                var item = {};
                item.id = $(galleryitem).data("mediaid");
                item.contentTypeAlias = $(galleryitem).data("mediacontenttypealias");
                items.push(item);
            });

            // - only if additional/new media was selected, not i.e. deleted
            if (e !== undefined) {
                angular.forEach(e, function (mediaitem, index) {
                    var item = {};
                    item.id = mediaitem.id;
                    item.contentTypeAlias = mediaitem.contentTypeAlias;
                    items.push(item);
                });
            }

            // - save gallery items
            var gallery = {};
            gallery.itemcount = items.length;
            gallery.items = items;

            // - only go full cycle if items got added
            if (e === undefined) {
                block.setData(gallery);
            } else {
                block.setAndLoadData(gallery);
                block.ready();
            }
        },

        addImage: function (mediaid) {
            // - preserve current scope for mediaResource callback
            var scope = block;

            // - add placeholder for awaited image (css background)
            var preview = $("<li>", { class: "ust-gallery-preview", "data-mediaid": mediaid });
            preview.append($("<a>", { class: "st-icon st-block-ui-btn--delete", "data-icon": "bin" }));

            scope.$editor.find(".ust-gallery").append(preview);

            //- fetch media (request intensive, but works for now)
            uMediaResource.getById(mediaid)
            .then(function (media) {
                var mel = scope.$editor.find(".ust-gallery-preview[data-mediaid='" + mediaid + "']");
                var thumburl = uMediaHelper.resolveFile(media, true);
                //style: "background-image:url(" + thumburl + ");"
                // - set image as background
                $(mel).css("background-image", "url(" + thumburl + ")");
                // - add media item's doc type alias
                $(mel).data("mediacontenttypealias", media.contentTypeAlias);
            });

            $(scope.$editor.find(".ust-gallery")).sortable().bind('sortupdate', function () {
                var items = [];

                angular.forEach(block.$editor.find(".ust-gallery .ust-gallery-preview"), function (galleryitem, index) {
                    var item = {};
                    item.id = $(galleryitem).data("mediaid");
                    item.contentTypeAlias = $(galleryitem).data("mediacontenttypealias");
                    items.push(item);
                });

                // - save gallery items
                var gallery = {};
                gallery.itemcount = items.length;
                gallery.items = items;
                block.setData(gallery);
                block.data = gallery;
                block.ready();
            });
        }

    });

})();


/*
 * DEPENDENCY
 */

/*
 * HTML5 Sortable jQuery Plugin
 * http://farhadi.ir/projects/html5sortable
 * 
 * Copyright 2012, Ali Farhadi
 * Released under the MIT license.
 */
(function ($) {
    var dragging, placeholders = $();
    $.fn.sortable = function (options) {
        var method = String(options);
        options = $.extend({
            connectWith: false
        }, options);
        return this.each(function () {
            if (/^enable|disable|destroy$/.test(method)) {
                var items = $(this).children($(this).data('items')).attr('draggable', method == 'enable');
                if (method == 'destroy') {
                    items.add(this).removeData('connectWith items')
                        .off('dragstart.h5s dragend.h5s selectstart.h5s dragover.h5s dragenter.h5s drop.h5s');
                }
                return;
            }
            var isHandle, index, items = $(this).children(options.items);
            var placeholder = $('<' + (/^ul|ol$/i.test(this.tagName) ? 'li' : 'div') + ' class="sortable-placeholder">');
            items.find(options.handle).mousedown(function () {
                isHandle = true;
            }).mouseup(function () {
                isHandle = false;
            });
            $(this).data('items', options.items)
            placeholders = placeholders.add(placeholder);
            if (options.connectWith) {
                $(options.connectWith).add(this).data('connectWith', options.connectWith);
            }
            items.attr('draggable', 'true').on('dragstart.h5s', function (e) {
                if (options.handle && !isHandle) {
                    return false;
                }
                isHandle = false;
                var dt = e.originalEvent.dataTransfer;
                dt.effectAllowed = 'move';
                dt.setData('Text', 'dummy');
                index = (dragging = $(this)).addClass('sortable-dragging').index();
            }).on('dragend.h5s', function () {
                dragging.removeClass('sortable-dragging').show();
                placeholders.detach();
                if (index != dragging.index()) {
                    items.parent().trigger('sortupdate', { item: dragging });
                }
                dragging = null;
            }).not('a[href], img').on('selectstart.h5s', function () {
                this.dragDrop && this.dragDrop();
                return false;
            }).end().add([this, placeholder]).on('dragover.h5s dragenter.h5s drop.h5s', function (e) {
                if (!items.is(dragging) && options.connectWith !== $(dragging).parent().data('connectWith')) {
                    return true;
                }
                if (e.type == 'drop') {
                    e.stopPropagation();
                    placeholders.filter(':visible').after(dragging);
                    return false;
                }
                e.preventDefault();
                e.originalEvent.dataTransfer.dropEffect = 'move';
                if (items.is(this)) {
                    if (options.forcePlaceholderSize) {
                        placeholder.height(dragging.outerHeight());
                    }
                    dragging.hide();
                    $(this)[placeholder.index() < $(this).index() ? 'after' : 'before'](placeholder);
                    placeholders.not(placeholder).detach();
                } else if (!placeholders.is(this) && !$(this).children(options.items).length) {
                    placeholders.detach();
                    $(this).append(placeholder);
                }
                return false;
            });
        });
    };
})(jQuery);

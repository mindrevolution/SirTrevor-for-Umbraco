/*
  Ordered List
*/

SirTrevor.Blocks.ContentPicker = (function () {

    // - umbraco ng references
    var ngi = angular.element("body").injector();
    var uDialogService = ngi.get("dialogService");
    
    var block;

    var template = '<div class="st-contentpicker-block" contenteditable="true"><a href="#">Pick some content...</a></div>';

    function pickContentHandler(ev) {
        ev.preventDefault();
        this.pickContent();
    }

    return SirTrevor.Block.extend({

        type: "content_picker",
        title: function () { return "Content Picker"; },
        icon_name: 'ContentPicker',
        droppable: false,
        uploadable: false,
        pastable: false,
        ajaxable: false,
        controllable: true,


        controls: {
            "text": pickContentHandler
        },

        pickContent: function() {
            uDialogService.contentPicker({ multipicker: false, callback: block.onContentSelected });
        },
        editorHTML: function () {
            return _.template(template, this);
        },

        loadData: function (data) {
            this.getTextBlock().html("<p>I would load content here</p>");
            block = this; // - unify context
            block.setContent(data.id);
        },

        onBlockRender: function () {
            if (typeof this.blockStorage.data.id === "undefined") {
                // - preserve current scope for callback 'onMediaSelected'
                block = this;
                block.pickContent();
            }
        },

        onContentSelected: function (e) {
            var content = {};
            content.id = e.id;
            content.name = e.name;
            console.debug( e );
            
            uDialogService.closeAll();

            // - save media data
            block.setAndLoadData(content);
            block.ready();
        },

        setContent: function (mediaid) {
            var content = block.blockStorage.data;
            block.$editor.html($("<a>", { href: "#", text: content.name, title: content.name + " (" + content.id + ")" }));

            // TODO: Open content in a template? http://umbraco.github.io/Belle/#/api/umbraco.services.dialogService#open

            //- fetch media (request intensive, but works for now)

          /*  uMediaResource.getById(mediaid)
            .then(function (media) {
                var thumburl = uImageHelper.getThumbnailFromPath(uImageHelper.getImagePropertyValue({ imageModel: media }));

                scope.$editor.html($("<img>", { src: thumburl, class: "ust-previewimg" }));
            });
            */
        }

    });

})();
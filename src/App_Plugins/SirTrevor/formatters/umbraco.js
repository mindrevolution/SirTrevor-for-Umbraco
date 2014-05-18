/* Umbraco only formatters */
(function () {
    var formatter;

    var Link = SirTrevor.Formatter.extend({

        title: "link",
        iconName: "link",
        cmd: "CreateLink",
        text: "link",

        onClick: function () {
            // - preserve current scope for callback
            formatter = this;

            // - show link picker
            angular.element("body").injector().get("dialogService").linkPicker({ callback: this.onLinkSelected });
        },

        isActive: function () {
            var selection = window.getSelection(),
                node;

            if (selection.rangeCount > 0) {
                node = selection.getRangeAt(0)
                                .startContainer
                                .parentNode;
            }

            // - remember selection (click events in same document ahead!)
            lastselection = this.saveSelection();

            return (node && node.nodeName == "A");
        },

        onLinkSelected: function (e) {
            var link;
            var linktitle;

            if (typeof e.id === "undefined") {
                // - classic URL
                link = e.url;
                linktitle = e.name;
            } else {
                // - internal Umbraco link
                link = "/{localLink:" + e.id + "}";
                linktitle = e.name;
            }

            // - restore saved selection
            formatter.restoreSelection(lastselection);
            // - assign link
            if (link && link.length > 0) {
                document.execCommand(formatter.cmd, false, link);
            }
        },

        lastselection: null,

        saveSelection: function() {
            if (window.getSelection) {
                sel = window.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    return sel.getRangeAt(0);
                }
            } else if (document.selection && document.selection.createRange) {
                return document.selection.createRange();
            }
            return null;
        },

        restoreSelection: function(range) {
            if (range) {
                if (window.getSelection) {
                    sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                } else if (document.selection && range.select) {
                    range.select();
                }
            }
        }
 
    });

    /*
      Create our formatters and add a static reference to them
    */
    SirTrevor.Formatters.Link = new Link();

})();
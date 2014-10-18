export default {

    name: 'discourse-mathjax',
    after: 'inject-objects',

    initialize: function (container) {
        var siteSettings = container.lookup('site-settings:main');
        if (siteSettings.enable_mathjax_plugin == false) {
            return;
        }
        $LAB.script(siteSettings.mathjax_url + '?config=' + siteSettings.mathjax_config).wait(function () {

            MathJax.Hub.Config({
                "HTML-CSS": {
                    preferredFont: "TeX",
                    availableFonts: ["TeX"],
                    linebreaks: {
                        automatic: true
                    },
                    EqnChunk: (MathJax.Hub.Browser.isMobile ? 10 : 50)
                },
                tex2jax: {
                    inlineMath: [
                        ["$", "$"],
                        ["\\\\(", "\\\\)"]
                    ],
                    displayMath: [
                        ["$$", "$$"],
                        ["\\\\[", "\\\\]"]
                    ],
                    processEscapes: true
                },
                TeX: {
                    noUndefined: {
                        attributes: {
                            mathcolor: "red",
                            mathbackground: "#FFEEEE",
                            mathsize: "90%"
                        }
                    },
                    Macros: {
                        href: "{}"
                    }
                },
                messageStyle: "none"
            });

            var applyPreview = function () {
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, "wmd-preview"]);
                // if the caret is on the last line ensure preview scrolled to bottom
                var caretPosition = Discourse.Utilities.caretPosition(this.wmdInput[0]);
                if (!this.wmdInput.val().substring(caretPosition).match(/\\n/)) {
                    var $wmdPreview = $('#wmd-preview');
                    if ($wmdPreview.is(':visible')) {
                        $wmdPreview.scrollTop($wmdPreview[0].scrollHeight);
                    }
                }
            };

            var applyBody = function () {
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, "topic"]);
            };

            Discourse.PostView.prototype.on("postViewInserted", applyBody);
            container.lookupFactory('view:composer').prototype.on("previewRefreshed", applyPreview);

        });

    }
}

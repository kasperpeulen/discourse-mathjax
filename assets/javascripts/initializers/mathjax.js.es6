export default {

    name: 'discourse-mathjax',

    initialize: function (container) {
        var mathjaxUrl = '//cdn.mathjax.org/mathjax/latest/MathJax.js';
        $LAB.script(mathjaxUrl + '?config=TeX-AMS-MML_HTMLorMML').wait(function () {

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
	

	    var decorate = function(klass, f, evt) {
	      klass.reopen({
        	_applyMathjax: function($elem) {
	          f($elem);
        	}.on(evt)
	      });
	    };

	    decorate(Discourse.PostView, applyBody, 'postViewInserted');
	    decorate(container.lookupFactory('view:composer'), applyPreview, 'previewRefreshed');
	    decorate(container.lookupFactory('view:embedded-post'), applyPreview, 'previewRefreshed');
	    decorate(Discourse.UserStreamView, applyBody, 'didInsertElement');
	});
    }
}

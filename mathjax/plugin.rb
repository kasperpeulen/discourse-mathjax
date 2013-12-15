# name: MathJax support for Discourse
# version: 0.4
# authors: Sam Saffron, Kasper Peulen

register_asset('javascripts/tex_dialect.js', :server_side)
register_javascript <<JS 

    Discourse.addInitializer(function () {

      $LAB.script('http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML').wait(function() {

MathJax.Hub.Config({ "HTML-CSS": { 
	preferredFont: "TeX", 
	availableFonts: ["TeX"], 
	linebreaks: { automatic:true }, 
	EqnChunk: (MathJax.Hub.Browser.isMobile ? 10 : 50) },
        tex2jax: { 
	inlineMath: [ ["$", "$"], ["\\\\(","\\\\)"] ], 
	displayMath: [ ["$$","$$"], ["\\\\[", "\\\\]"] ], 
	processEscapes: true},
        TeX: { 
	noUndefined: { attributes: { mathcolor: "red", mathbackground: "#FFEEEE", mathsize: "90%" } }, 
	Macros: { href: "{}" } },
        messageStyle: "none"
});

        var applyPreview = function(){
          MathJax.Hub.Queue(["Typeset",MathJax.Hub,"wmd-preview"]);
		  	// if the caret is on the last line ensure preview scrolled to bottom
			var caretPosition = Discourse.Utilities.caretPosition(this.wmdInput[0]);
			if (!this.wmdInput.val().substring(caretPosition).match(/\n/)) {
			var $wmdPreview = $('#wmd-preview');
			if ($wmdPreview.is(':visible')) {
			$wmdPreview.scrollTop($wmdPreview[0].scrollHeight);
        };

        var applyBody = function(){
          MathJax.Hub.Queue(["Typeset",MathJax.Hub,"topic"]);
        };

        Discourse.PostView.prototype.on("postViewInserted", applyBody);
        Discourse.ComposerView.prototype.on("previewRefreshed", applyPreview);

      });

    });
JS

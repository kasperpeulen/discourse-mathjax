Discourse.Dialect.inlineBetween({
  start: '\\(',
  stop: '\\)',
  rawContents: true,
  emitter: function(contents) { return '\\('+contents+'\\)';  }
});

Discourse.Dialect.inlineBetween({
  start: '$',
  stop: '$',
  rawContents: true,
  emitter: function(contents) { return '$'+contents+'$';  }
});

Discourse.Dialect.replaceBlock({
  start: /(\\\[)([\s\S]*)/,
  stop: '\\]',
  rawContents: true,
  emitter: function(contents) { return '\\['+contents+'\\]';  }
});

Discourse.Dialect.replaceBlock({
  start: /(\$\$)([\s\S]*)/,
  stop: '$$',
  rawContents: true,
  emitter: function(contents) { return '$$'+contents+'$$';  }
});

Discourse.Dialect.inlineRegexp({
  start: ' ',
  matcher: /(\\begin{[\S\s]+})([\S\s]*)(\\end{[\S\s]+})/,
  emitter: function(matches) { return matches[0]; }
});

/**
Discourse.Dialect.inlineRegexp({
  start: /\$\$/,
  matcher: /(\$\$)([\S\s]+)(\$\$)/,
  emitter: function(matches) { 
	if ( matches[2].match(/[\S\s]+[&][\S\s]+/) ){
		return '\\begin{align*}'+matches[2]+'\\end{align*}'; }
	else {return matches[0];}
	}
});
**/
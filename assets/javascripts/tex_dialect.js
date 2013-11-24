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

Discourse.Dialect.inlineRegexp({
  start: /\$\$/,
  matcher: /(\$\$)([\S\s]+)(\$\$)/,
  emitter: function(matches) { return matches[0]; }
});

Discourse.Dialect.inlineRegexp({
  start: '\\begin',
  matcher: /(\\begin{[\S\s]+})([\S\s]*)(\\end{[\S\s]+})/,
  emitter: function(matches) { return matches[0]; }
});

/**
This is a function that allows $$..$$ to be used as align if a & is typed.
Usefull for lazy latex typers like me, it works like shortcut.

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
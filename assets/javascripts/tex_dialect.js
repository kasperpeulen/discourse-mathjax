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
  start: '\\begin',
  matcher: /(\\begin{[\S\s]+})([\S\s]*)(\\end{[\S\s]+})/,
  emitter: function(matches) { return matches[0]; }
});
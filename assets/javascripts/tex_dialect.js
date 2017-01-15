(function() {
    // Don't bother with this code if the new dialect system is present
    if (Discourse.dialect_deprecated) { return; }

    Discourse.Dialect.inlineBetween({
        start: '\\(',
        stop: '\\)',
        rawContents: true,
        emitter: function (contents) {
            return '\\(' + contents + '\\)';
        }
    });

    Discourse.Dialect.inlineBetween({
        start: '\\[',
        stop: '\\]',
        rawContents: true,
        emitter: function (contents) {
            return '\\[' + contents + '\\]';
        }
    });

    Discourse.Dialect.inlineBetween({
        start: '$$',
        stop: '$$',
        rawContents: true,
        emitter: function (contents) {
        return '$$' + contents + '$$';
        }
    });


    Discourse.Dialect.inlineBetween({
        start: '$',
        stop: '$',
        rawContents: true,
        emitter: function (contents) {
            return '$' + contents + '$';
        }
    });

    Discourse.Dialect.inlineRegexp({
        start: '\\begin',
        matcher: /(\\begin{[\S\s]+})([\S\s]*)(\\end{[\S\s]+})/,
        emitter: function (matches) {
            return matches[0];
        }
    });

    //these last two are to make asciimath support possible

    Discourse.Dialect.inlineBetween({
        start: 'ˊˊ',
        stop: 'ˊˊ',
        rawContents: true,
        emitter: function (contents) {
            return 'ˊˊ' + contents + 'ˊˊ';
        }
    });

    Discourse.Dialect.inlineBetween({
        start: 'ˊ',
        stop: 'ˊ',
        rawContents: true,
        emitter: function (contents) {
            return 'ˊ' + contents + 'ˊ';
        }
    });
})();

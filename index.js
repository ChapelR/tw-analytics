const analytics = require('./lib/analytics.js');

let options = {
    id : '',
    input : '',
    output : ''
};

function handleSettings (opts) {
    let settings = {};
    if (typeof opts === 'object') {
        settings = Object.assign(options, opts);
    } else if (typeof opts === 'string') {
        const args = [].slice.call(arguments);
        settings.id = args[0];
        if (args[1] && typeof args[1] === 'string') {
            settings.input = args[1];
        } else if (options.input && typeof options.input === 'string') {
            settings.input = options.input;
        } else {
            settings.input = './index.html';
        }
        if (args[2] && typeof args[2] === 'string') {
            settings.output = args[2];
        } else if (options.output && typeof options.output === 'string') {
            settings.output = options.output;
        } else if (settings.input && typeof settings.input === 'string') {
            settings.output = settings.input;
        } else {
            settings.output = './analytics.html';
        }
    } else {
        settings = options;
    }
    return settings;
}

function create (opts) {
    const settings = handleSettings.apply(null, [].slice.call(arguments));
    analytics(settings.id, settings.input, settings.output);
}

module.exports = Object.assign({
    analytics : create
}, options);

/*

    USAGE:

        var twga = require('tw-analytics');

        // option 1
        twga.id = 'UA-XXXX-Y';
        twga.input = 'index.html';
        twga.output = 'dist/index.html'
        twga.analytics();

        // option 2
        twga.analytics('UA-XXXX-Y', 'index.html', 'dist/index.html');

        // option 3
        twga.analytics({
            id : 'UA-XXXX-Y',
            input : 'index.html',
            output : 'dist/index.html'
        });

*/
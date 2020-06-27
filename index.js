/* jshint node: true, esversion: 6 */

const analytics = require('./lib/analytics.js');

function handleSettings (opts) {
    let settings = {};
    if (typeof opts === 'string') {
        const args = [].slice.call(arguments);
        settings.id = args[0];
        settings.input = args[1];
        settings.output = args[2];
    } else {
        settings = opts;
    }

    if (!settings.input || typeof settings.input !== 'string') {
        settings.input = './index.html';
    }
    if (!settings.output || typeof settings.output !== 'string') {
        settings.output = settings.input;
    }

    return settings;
}

function create (opts) {
    const settings = handleSettings.apply(null, [].slice.call(arguments));
    analytics(settings.id, settings.input, settings.output, settings.bin || false);
}

module.exports = create;

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
/* jshint node: true, esversion: 6 */

const fs = require('fs-jetpack'),
    path = require('path');

const gtag = `
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id={{tracking-id}}"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '{{tracking-id}}');
    </script>
</head>`;

const cwd = process.cwd() + path.sep;

function checkID (id) {
    let errors = [], trackingID = '', idParts = [];
    // determine whether tracking id is valid
    if (!id || typeof id !== 'string') {
        errors.push('Analytics (id) -> Tracking id does not exist or is not a string.');
    } else {
        trackingID = id.trim().toUpperCase();
        if (!trackingID) {
            errors.push('Analytics (id) -> Tracking id cannot be an empty string.');
        }
        idParts = trackingID.split('-');
        if (idParts[0] !== 'UA' || idParts.length !== 3 || idParts[2].length !== 1) {
            errors.push('Analytics (id) -> Tracking id appears to be malformed.');
        }
    }
    if (errors.length) {
        errors.unshift('Analytics (id) -> the tracking id "' + id + '" is not valid:');
        return errors; // array = errored
    } else {
        return trackingID; // string = no errors
    }
}

function generateScript (id) {
    const trackingID = checkID(id);

    if (trackingID && trackingID instanceof Array) {
        throw new Error(trackingID.join('\n'));
    } 

    let script = gtag.replace(/{{tracking-id}}/g, trackingID);
    return script;

}

function writeTrackingScript (input, id) {
    const script = generateScript(id);

    let file = fs.read(path.resolve(cwd, input), 'utf8');
    if (file.includes('<!-- Global site tag (gtag.js) - Google Analytics -->')) {
        throw new Error('This file already contains Google analytics code.');
    }
    file = file.replace('</head>', script);
    return file;
}

function generateAnalytics (id, input, output) {
    const data = writeTrackingScript(input, id);
    fs.write(path.resolve(cwd, output), data, { atomic : true });
}

module.exports = generateAnalytics;
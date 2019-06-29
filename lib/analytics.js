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
        if (!id) {
            errors.push('Analytics (id) -> Tracking id cannot be an empty string.');
        }
        idParts = trackingID.split('-');
        if (idParts[0] !== 'UA' || idParts.length !== 3 || idParts[2].length !== 1) {
            errors.push('Analytics (id) -> Tracking id appears to be malformed.');
        }
    }
    if (errors.length) {
        return errors.unshift('Analytics (id) -> the tracking id "' + id + '" is not valid:'); // array = errored
    } else {
        return trackingID; // string = no errors
    }
}

function generateScript (id) {
    const trackingID = checkID(id);
    let errors = [];

    if (trackingID && Array.isArray(trackingID)) {
        console.error(trackingID.join('\n'));
        return; // bail
    } 

    try {
        let script = gtag.replace(/{{tracking-id}}/g, trackingID);
        return script;
    } catch (err) {
        errors.push('Analytics (script) -> ' + err.message);
    } finally {
        if (errors.length) {
            console.error(errors.join('\n'));
        }
    }
}

function writeTrackingScript (input, id) {
    const script = generateScript(id);
    if (!script) {
        console.error('Analytics (write) -> Could not generate script.');
        return;
    }
    try {
        let file = fs.read(path.resolve(cwd, input), 'utf8');
        if (file.includes('<!-- Global site tag (gtag.js) - Google Analytics -->')) {
            console.error('ERROR: This file already contains Google analytics code.');
        }
        file = file.replace('</head>', script);
        return file;
    } catch (err) {
        console.error('Analytics (write) -> ' + err.message);
    }
}

function generateAnalytics (id, input, output) {
    const data = writeTrackingScript(input, id);
    if (!data) {
        console.error('Analytics (generate) -> Could not generate script.');
        return;
    }
    try {
        fs.write(path.resolve(cwd, output), data, { atomic : true });
    } catch (err) {
        console.error('Analytics (generate) -> ' + err.message);
    }
}

module.exports = generateAnalytics;
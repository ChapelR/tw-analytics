/* jshint mocha: true */
const twga = require('../index.js');
const jetpack = require('fs-jetpack');
const assert = require('assert');

jetpack.remove('./test/out1.html');
jetpack.remove('./test/out2.html');
jetpack.remove('./index.html');
const html = jetpack.read('./test/test.html', 'utf8');
jetpack.write('./index.html', html, { atomic : true });

twga('UA-1111-1', './test/test.html', './test/out1.html');
twga({ id : 'UA-1111-2', input : './test/test.html', output : './test/out2.html' });
twga('UA-1111-3');

function fileHasGtag (file, id) {
    var string = jetpack.read(file, 'utf8');
    return string.includes('<!-- Global site tag (gtag.js) - Google Analytics -->') &&
        string.includes('window.dataLayer = window.dataLayer || [];') &&
        string.includes(id);
}

describe('twga', function () {
    it('should work with just one argument', function () {
        assert(fileHasGtag('./index.html', 'UA-1111-3'), 'file does not include ga');
    });
    it('should work if given an options object', function () {
        assert(fileHasGtag('./test/out2.html', 'UA-1111-2'), 'file does not include ga');
    });
    it('should work when given discreet arguments', function () {
        assert(fileHasGtag('./test/out1.html', 'UA-1111-1'), 'file does not include ga');
    });
    it('should error on malformed IDs', function () {
        assert.throws(() => twga('foo'));
        assert.throws(() => twga(13));
    });
    it('should error with no arguments', function () {
        assert.throws(() => twga());
    });
    it('should error on empty string id', function () {
        assert.throws(() => twga('   '));
        assert.throws(() => twga(''));
    });
    it('should throw if ga is already present', function () {
        assert.throws(() => twga('UA-1111-1', './test/out1.html', './test/out3.html'));
    });
});

//jetpack.remove('./index.html');
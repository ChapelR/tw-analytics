## tw-analytics

![](https://travis-ci.org/ChapelR/tw-analytics.svg?branch=master) [![Coverage Status](https://coveralls.io/repos/github/ChapelR/tw-analytics/badge.svg?branch=master)](https://coveralls.io/github/ChapelR/tw-analytics?branch=master) [![NPM](https://nodei.co/npm/tw-analytics.png?mini=true)](https://npmjs.org/package/tw-analytics)

Add Google analytics tracking to your Twine game (or other web app).

[Newbie User Guide (originally by Somnium)](https://gist.github.com/ChapelR/690c89fd8349f3cf465a04a6de226666#file-readme-md)

### Installation (CLI)

Install via NPM: `npm install --global tw-analytics`.

Use the command `twga` to run it.

### Usage (CLI)

`twga --id=UA-XXXX-Y -i index.html -o output.html`

To use the CLI, you must provide your Google Analytics tracking ID using the `--id` option, and a source file via the `--input` (alias: `-i`) option. You may provide an output file path/name using the `--output` (alias: `-o`) option. If you don't provide an output file, the program will overwrite the input file with the new version with the tracking scripts added. 

To see some command and option help, use `--help`. To check the version, `--version`.

### Install (module)

To use this module in your scripts as a part of a build process rather than as a CLI.

Install via: `npm install --save-dev tw-anaytics`.

You can then use `require('tw-analytics')` in your scripts to expose the function.

### Usage (module)

```javascript
var twga = require('tw-analytics');

twga(options);

// -- or --

twga(id, input, output);
```

**Arguments**:  
- `options` (object): a generic object containing the `id`, `input`, and `output` properties, as described below.  
- `id` (string): your Google analytics tracking ID.  
- `input` optional (string): the path to your compiled html file. Defaults to `'index.html'` if none is provided.  
- `output` optional (string): the path to save the altered file to. Overwrites the input file if no option is provided.   

**Examples**:

Object version:

```javascript
twga({
    id : 'UA-XXXXX-Y',
    input : './src/index.html',
    output : './dist/index.html'
});
```

Object version, overwrite input file:

```javascript
twga({
    id : 'UA-XXXXX-Y',
    input : './src/index.html'
});
```

Object version, minimum arguments:

```javascript
twga({ id : 'UA-XXXXX-Y' }); // targets and replaces a file named `index.html` in the current folder
```

Separate arguments version:

```javascript
twga('UA-XXXXX-Y', './src/index.html', './dist/index.html');
```

Separate arguments version, overwrite the input file:

```javascript
twga('UA-XXXXX-Y', './src/index.html');
```

Separate arguments version, minimum arguments:

```javascript
twga('UA-XXXXX-Y'); // targets and replaces a file named `index.html` in the current folder
```
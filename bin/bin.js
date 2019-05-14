#! /usr/bin/env node

const yargs = require('yargs'),
       main = require('../index.js');



args = yargs.option('id', {
    describe : 'Your Google Analytics tracking ID.',
    type : 'string'
})
.option('input', {
    describe : 'The compiled Twine html file to add tracking to.',
    alias : 'i',
    type : 'string'
})
.option('output', {
    describe : 'The output file to save. If not provided, the input file will be saved over.',
    alias : 'o',
    type : 'string'
})
.demandOption(['id', 'input'], 'Please provide at least a tracking ID and an input file.')
.help()
.argv;

main({ 
    id : args.id, 
    input : args.input, 
    output : args.output, 
    bin : true 
});
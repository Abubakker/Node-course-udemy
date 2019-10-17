////const name = 'Md. Abu bakker siddique';
////console.log('Hello: ' + name); // Print variable
//
////const name = require('./utils.js');
////console.log('Hello: ' + name); // catch name like as a varible
////
////
const validator = require('validator');
//const add = require('./utils.js');
//const sum = add(4, 5);
//console.log(sum);
//
//console.log(validator.isEmail('bakker@gmail.com'));
//console.log(validator.isURL('https://www.npmjs.com/package/validator'));
//
//
const chalk = require('chalk');
////console.log(chalk.blue('Hello world!'));
//
////const result = validator.isEmail('bakker@gmail.com');
////const color = (result === true) ? 'green' : 'blue';
////console.log(color);
////console.log(chalk.green.bold('Result.'));
////console.log(chalk.red.inverse('Error.'));
//////console.log(chalk.blue.inverse('blue.'));
//////console.log(chalk.green.bold.inverse('Result.'));
//////console.log(chalk.green.bgRed.bold.inverse('Result.'));
////
////console.log(process.argv[2]);


//console.log(process.argv);
//const command = process.argv[2];
//
//if(command === 'add'){
//    console.log('Adding note!');
//}else if(command === 'remove'){
//    console.log('Removing note!');
//}

const yargs = require('yargs');
const notes = require('./notes.js');

//customize yargs version
yargs.version('1.1.0');

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
//    handler: function (argv) {
////        console.log('Adding a new note!', argv);
////        console.log('Title: ' + argv.title);
////        console.log('Body: ' + argv.body);
//        notes.addNote(argv.title, argv.body);
//    }
    handler(argv) {
//        console.log('Adding a new note!', argv);
//        console.log('Title: ' + argv.title);
//        console.log('Body: ' + argv.body);
        notes.addNote(argv.title, argv.body);
    }
});

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
//    handler: function (argv) {
////        console.log('Remove the note!');
//        notes.removeNote(argv.title);
//    }
    handler(argv) {
//        console.log('Remove the note!');
        notes.removeNote(argv.title);
    }
});

// Create list command
yargs.command({
    command: 'list',
    describe: 'List your note',
    builder: {
        title: {
            describe: 'List your note',
        },
    },
//    handler: function () {
//        console.log('List out all note!');
//    }
    handler() {
        console.log('List out all note!');
    }
});

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
//    handler: function () {
//        console.log('Read a note.');
//    }
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
        //console.log('Read a note.');
    }
});

//Add, remove, read, list
// yargs.parse();
console.log(yargs.argv);
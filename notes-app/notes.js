const fs = require('fs');
const chalk = require('chalk');
const getNotes = () => {
    return 'Notes text ...';
};

const addNote = (title, body) => {
    const notes = loadNotes();
    console.log(notes);
    //const duplicateNotes = notes.filter((note) => note.title === title);
    const duplicateNote = notes.find((note) => note.title === title);
//    const duplicateNotes = notes.filter(function (note) {
//        return note.title === title;
//    });

//    console.log(duplicateNote);
//    console.log(title);
    debugger
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added.'));
    } else {
        console.log(chalk.red.inverse('Note title taken.'));
    }
//    if (duplicateNotes.length === 0) {
//        notes.push({
//            title: title,
//            body: body
//        });
//        saveNotes(notes);
//        console.log(chalk.green.inverse('New note added.'));
//    } else {
//        console.log(chalk.red.inverse('Note title taken.'));
//    }
};

const removeNote = (title) => {
    const notes = loadNotes();
    console.log(notes);
    const notesToKeep = notes.filter((note) => note.title !== title);
//    const notesToKeep = notes.filter(function (note) {
//        return note.title !== title;
//    });

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note Removed.'));
        saveNotes(notesToKeep);
    } else {
        console.log(chalk.red.inverse('No Note found.'));
    }
    //saveNotes(notesToKeep);
};

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);

    if (note) {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse('note not found.'));
    }
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

//const saveNotes = function (notes) {
//    const dataJSON = JSON.stringify(notes);
//    fs.writeFileSync('notes.json', dataJSON);
//};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json'); // get binary data
        const dataJSON = dataBuffer.toString(); // convert string data
        return JSON.parse(dataJSON); // return json data
    } catch (e) {
        return [];
    }
};
//const loadNotes = function () {
//    try {
//        const dataBuffer = fs.readFileSync('notes.json'); // get binary data
//        const dataJSON = dataBuffer.toString(); // convert string data
//        return JSON.parse(dataJSON); // return json data
//    } catch (e) {
//        return [];
//    }
//};

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote
};
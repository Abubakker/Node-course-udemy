console.log('Welcome to the Node JS world !');
const fs = require('fs');
fs.writeFileSync('my_details.txt', 'My Name is Md. Abu Bakker Siddique.'); // For create new file
fs.appendFileSync('my_details.txt', ' I live in Bangladesh.'); // For append a text on exiting file

const name = 'Md. Abu bakker siddique';
console.log('Hello: ' + name);
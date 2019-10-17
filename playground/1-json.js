const fs = require('fs');
//const book = {
//    title: 'Book Name',
//    author: 'Abu bakker'
//};
//
//const bookJSON = JSON.stringify(book);
//console.log(bookJSON);
//
//const parseData = JSON.parse(bookJSON);
//console.log(parseData.title);
//console.log(parseData.author);
//
//fs.writeFileSync('1-json.json', bookJSON);

//const dataBuffer = fs.readFileSync('1-json.json'); // binary data
//const dataJSON = dataBuffer.toString();  // string data
//const data = JSON.parse(dataJSON); // json format data
//console.log(data.title); // json object
//console.log(data.title);

const dataBuffer = fs.readFileSync('1-json.json');
const dataJSON = dataBuffer.toString();
const user = JSON.parse(dataJSON);

user.name = 'Abu bakker siddique';
user.address = 'Nayagola, CN, Bangladesh.';
user.age = 26;

const userJson = JSON.stringify(user);
console.log(userJson);
fs.writeFileSync('1-json.json', userJson);// file write

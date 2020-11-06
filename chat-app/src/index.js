const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const {generateMessage, generateLocation} = require('./utils/messages');
const {addUser, removeUser, getUser, getUsersInRoom} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 4000;
// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)); // defult view

app.get('/', function (req, res) {
    res.send('Hello World');
});

//let count = 0;

io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.on('join', (option, callback) => {
        const {error, user} = addUser({id: socket.id, ...option});

        if (error) {
            return callback(error)
        }

        socket.join(user.room);

        // Message show defult
        socket.emit('message', generateMessage('Admin', 'Welcome!'));
        // Message show when join any user
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined!`));

        // for room users info
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        });
        callback()
        // socket.emit, io.emit, socket.broadcast.emit
        // io.to.emit, socket.broadcast.to.emit // to use for room
    });

    // Acknowledgement process
    // Message show from form submit
    socket.on('sendMessage', (msg, callback) => {
        const user = getUser(socket.id);
        // Form validateion
        const filter = new Filter();
        if (filter.isProfane(msg)) {
            return callback('Profanity is not allowed!')
        }
        io.to(user.room).emit('message', generateMessage(user.username, msg));
//        callback('Delivered')
        callback()
    });
    // Normal process
    // Message show from form submit
    //socket.on('sendMessage', (msg) => {
    //    io.emit('message', msg);
    //});

    // Get Geolocation
    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id);
        // io.emit('message', `Location:: lat:${coords.latitude}, long:${coords.longitude}`);
        io.to(user.room).emit('locationMessage', generateLocation(user.username, `https://www.google.com/maps?d=${coords.latitude},${coords.longitude}`));
        callback()
    });

    // Message show when disconnect any user
    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`));
            // for room users info
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            });
        }

    });

//    socket.emit('countUpdated', count);
//    socket.on('increment', () => {
//        count++;
//        // socket.emit('countUpdated', count);
//         io.emit('countUpdated', count);
//    });
});

server.listen(port, () => { // callback function
    console.log(`server is up on port ${port}!`);
});
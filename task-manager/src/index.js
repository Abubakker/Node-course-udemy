const express = require('express');
require('./db/mongoose'); // Data base connection
const User = require('./models/user');
const Task = require('./models/task');
const app = express();
const port = process.env.PORT || 4001;

app.use(express.json()); // Input field conver in a json

app.post('/users', (req, res) => {
//    const user = new User({ // Creating instance
//        name: '          Abu Bakker Siddique         ',
//        password: 'bakker123',
//        email: 'baKKer@siLiconOrchard.com         ',
//        age: 28
//    });

    const user = new User(req.body); // // Creating instance from input json
    user.save().then(() => { // Save into Database
        res.status(201).send(user);
    }).catch((error) => {
        res.status(400).send(error);
//        res.status(400);
//        res.send(error);
    });
});

app.get("/users", (req, res) => {
    User.find({}).then((users) => {
        res.send(users);
    }).catch((error) => {
        res.status(500).send(error); // response with status and error
    });
});

app.get("/users/:id", (req, res) => {
    const _id = req.params.id;
    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send("The user not found.");
        }
        res.send(user);
    }).catch((error) => {
        res.status(500).send(error); // response with status and error
    });
});

app.post('/tasks', (req, res) => {
    const task = new Task(req.body); // // Creating instance from input json
    task.save().then(() => { // Save into Database
        res.status(201).send(task);
    }).catch((error) => {
        res.status(400).send(error); // response with status and error
    });
});

app.get("/tasks", (req, res) => {
    Task.find({}).then((task) => {
        res.send(task);
    }).catch((error) => {
        res.status(500).send(error); // response with status and error
    });
});

app.get("/tasks/:id", (req, res) => {
    const _id = req.params.id;
    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send("The task not found.");
        }
        res.send(task);
    }).catch((error) => {
        res.status(500).send(error); // response with status and error
    });
});


app.listen(port, () => {
    console.log('Server is up on port ' + port + '.');
});
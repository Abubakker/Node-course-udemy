const express = require('express');
require('./db/mongoose'); // Data base connection
const User = require('./models/user');
const Task = require('./models/task');
const app = express();
const port = process.env.PORT || 4001;

app.use(express.json()); // Input field conver in a json

app.post('/users', async (req, res) => {
    const user = new User(req.body); // // Creating instance from input json
    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
//    const user = new User({ // Creating instance
//        name: '          Abu Bakker Siddique         ',
//        password: 'bakker123',
//        email: 'baKKer@siLiconOrchard.com         ',
//        age: 28
//    });

//    const user = new User(req.body); // // Creating instance from input json
//    user.save().then(() => { // Save into Database
//        res.status(201).send(user);
//    }).catch((error) => {
//        res.status(400).send(error);
////        res.status(400);
////        res.send(error);
//    });
});

app.get("/users", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/users/:id", async(req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send("The user not found.");
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/tasks', async(req, res) => {
    const task = new Task(req.body); // Creating instance from input json
    try {
        await task.save();
        res.status(201).send(task);
    } catch (exception) {
        res.status(400).send(exception);
    }
});

app.get("/tasks", async(req, res) => {
    try {
        const task = await Task.find({});
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/tasks/:id", async(req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send("The task not found.");
        }
        res.send(task);
    } catch (exception) {
        res.status(500).send(exception);
    }
});


app.listen(port, () => {
    console.log('Server is up on port ' + port + '.');
});
const express = require('express');
const User = require('../models/user');
const router = new express.Router();

router.post('/users', async (req, res) => {
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

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        res.send(user);
    } catch (exception) {
        res.status(400).send(exception);
    }
});

router.get("/users", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        throw new Error('Invalid user email.');
        res.status(500).send(error);
    }
});

router.get("/users/:id", async(req, res) => {
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

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const alloweUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => alloweUpdates.includes(update));

    if (!isValidOperation) {
        res.status(400).send({error: 'Invalid updates!'});
    }

    try {
        const user = await User.findById(req.params.id); // for call Middleware
        updates.forEach((update) => user[update] = req.body[update]); // for call Middleware
        await user.save(); // call Middleware
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new : true, runVaidators: true});
        if (!user) {
            return res.status(404).send("Update faild");
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send("Delete faild");
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports = router;
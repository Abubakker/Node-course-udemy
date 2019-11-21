const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/tasks', auth, async(req, res) => {
    // const task = new Task(req.body); // Creating instance from input json
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });
    try {
        await task.save();
        res.status(201).send(task);
    } catch (exception) {
        res.status(400).send(exception);
    }
});

router.get("/tasks", auth, async(req, res) => {
    try {
        // const task = await Task.find({owner: req.user._id});
        await req.user.populate('tasks').execPopulate(); // for table join
        res.send(req.user.tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/tasks/:id", auth, async(req, res) => {
    const _id = req.params.id;
    try {
        // const task = await Task.findById(_id);
        const task = await Task.findOne({_id, owner: req.user._id});
        if (!task) {
            return res.status(404).send("The task not found.");
        }
        res.send(task);
    } catch (exception) {
        res.status(500).send(exception);
    }
});

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const alloweUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => alloweUpdates.includes(update));

    if (!isValidOperation) {
        res.status(400).send({error: 'Invalid updates!'});
    }

    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id});
        // const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send("Update faild");
        }
        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        // const tasks = await Task.findByIdAndDelete({_id: req.params.id, owner: req.user._id}); check only id not auth id
        const tasks = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id});
        if (!tasks) {
            return res.status(404).send("Delete faild");
        }
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports = router;
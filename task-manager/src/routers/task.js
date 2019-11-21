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

router.get("/tasks", async(req, res) => {
    try {
        const task = await Task.find({});
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/tasks/:id", async(req, res) => {
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

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const alloweUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => alloweUpdates.includes(update));

    if (!isValidOperation) {
        res.status(400).send({error: 'Invalid updates!'});
    }

    try {
        const task = await Task.findById(req.params.id);
        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new : true, runVaidators: true});
        if (!task) {
            return res.status(404).send("Update faild");
        }
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/tasks/:id', async (req, res) => {
    try {
        const tasks = await Task.findByIdAndDelete(req.params.id);
        if (!tasks) {
            return res.status(404).send("Delete faild");
        }
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports = router;
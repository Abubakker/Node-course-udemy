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

// Get /task?completed=true|false
// Get /task?limit=10&skip=10
// Get /task?sortBy=createdAt:asc|createdAt:desc
router.get("/tasks", auth, async(req, res) => {
    try {
        // const task = await Task.find({owner: req.user._id});
        // await req.user.populate('tasks').execPopulate(); // for table join
        const match = {};
        const sort = {};
        if (req.query.completed) {
            match.completed = req.query.completed === 'true'; // if completed == true then true otherwise false
        }
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':');
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
        }
        await req.user.populate({path: 'tasks', match, options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }}).execPopulate(); // for table join // these are same match or completed : req.query.completed
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
const express = require('express');
const multer = require('multer');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body); // // Creating instance from input json
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch (exception) {
        res.status(400).send(exception);
    }
});

router.post('/users/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch (exception) {
        res.status(500).send(exception);
    }
});

router.post('/users/logoutAll', auth, async(req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (exception) {
        res.status(500).send(exception);
    }
});

router.get("/users/me", auth, async (req, res) => { // Find user own
    res.send(req.user);
});

router.get("/users", auth, async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        throw new Error('Invalid user email.');
        res.status(500).send(error);
    }
});

router.get("/users/byid/:id", auth, async(req, res) => { // Find user by id
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

router.patch('/users/byid/:id', auth, async (req, res) => { // User update by id
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
router.patch('/users/me', auth, async (req, res) => { // User update by id
    const updates = Object.keys(req.body);
    const alloweUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => alloweUpdates.includes(update));

    if (!isValidOperation) {
        res.status(400).send({error: 'Invalid updates!'});
    }

    try {
        // const user = await User.findById(req.user._id); // for call Middleware
        updates.forEach((update) => req.user[update] = req.body[update]); // for call Middleware
        await req.user.save(); // call Middleware
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new : true, runVaidators: true});
        res.send(req.user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/users/byid/:id', auth, async (req, res) => { // User delete by id
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

router.delete('/users/me', auth, async (req, res) => { // User delete own
    try {
//        const user = await User.findByIdAndDelete(req.user._id);
//        if (!user) {
//            return res.status(404).send("Delete faild");
//        }
        await req.user.remove();
        res.send(req.user);
    } catch (error) {
        res.status(500).send(error);
    }
});

const upload = multer({
    dest: 'profile-imgs',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(new Error('Please upload an image file (jpg or jpeg or png)'));
        }
        callback(undefined, true);
    }
});
router.post('/users/me/profile-img', upload.single('profile'), (req, res) => {
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({error: error.message});
});

module.exports = router;
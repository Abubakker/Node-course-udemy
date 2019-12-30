const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {// For test user
    _id: userOneId,
    name: 'bakker',
    email: 'bakker311042test@gmail.com',
    age: 27,
    password: 'bakker311042',
    tokens: [{
            token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
        }]
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {// For test user
    _id: userTwoId,
    name: 'abubakker',
    email: 'abubakker@gmail.com',
    age: 27,
    password: '123456789',
    tokens: [{
            token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET)
        }]
};

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First task',
    completed: false,
    owner: userOne._id
};

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second task',
    completed: true,
    owner: userOne._id
};

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Third task',
    completed: true,
    owner: userTwo._id
};

const setupDatabase = async () => {
    await User.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();

    await Task.deleteMany();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
};

module.exports = {
    userOneId,
    userOne,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
};
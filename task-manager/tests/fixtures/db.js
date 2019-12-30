const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');

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

const setupDatabase = async () => {
    await User.deleteMany();
    await new User(userOne).save();
};

module.exports = {
    userOneId,
    userOne,
    setupDatabase
};
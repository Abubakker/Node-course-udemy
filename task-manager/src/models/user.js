const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({// model, collection name is 'User'
    name: {
        type: String,
        required: true, // Validation
        trim: true // Validation
    },
    email: {
        type: String,
        unique: true,
        required: true, // Validation 
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) { // validator module use for Validation
                throw new Error('Email is invalid.');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error("Password can't contain 'password'.");
            }
        }
    },
    age: {
        type: Number,
        required: true, // Validation
        default: 0,
        validate(value) { // Custom Validation
            if (value <= 0) {
                throw new Error('Age must be a positive number.');
            }
        }
    }
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if (!user) {
        throw new Error('Invalid user email.');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid user password.');
    }
    return user;
};

// Has the password text before saving
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;

//const me = new User({// Creating instance
//    name: '          Abu Bakker Siddique         ',
//    password: 'bakker123',
//    email: 'baKKer@siLiconOrchard.com         ',
//    age: 28
//});
//
////me.save().then(() => { // Save into Database
////    console.log(me);
////}).catch((error) => {
////    console.log('Error: ', error);
////});
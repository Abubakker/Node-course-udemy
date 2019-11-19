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

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')){
       user.password= await bcrypt.hash(user.password, 8);
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
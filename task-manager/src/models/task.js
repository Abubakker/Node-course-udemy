const mongoose = require('mongoose');
const validator = require('validator');

const taskSchema = mongoose.Schema({// model, collection name is 'Task'
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

//const task = new Task({// Creating instance
//    description: '    Test a description        '
//});

//task.save().then(() => { // Save into Database
//    console.log(task);
//}).catch((error) => {
//    console.log('Error: ', error);
//});
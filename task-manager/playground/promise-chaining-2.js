require('../src/db/mongoose');
const Task = require('../src/models/task');

//Task.findByIdAndRemove('5dcd2a1cd3cff51c68389236').then((task) => {
//    console.log(task);
//    return task.countDocuments({completed: false});
//}).then((result) => {
//    console.log(result);
//}).catch((error) => {
//    console.log(error);
//});

//Task.findByIdAndDelete('5dce310b69c0293d08a239a7').then((task) => {
//    console.log(task);
//    return Task.countDocuments();
//}).then((result) => {
//    console.log(result);
//}).catch((error) => {
//    console.log(error);
//});

const deleteTaskAndCount = async(id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed: false});
    return count;
};

deleteTaskAndCount('5dce310569c0293d08a239a7').then((count) => {
    console.log('Un-completed task: ', count);
}).catch((error) => {
    console.log(error);
});

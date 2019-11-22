const express = require('express');
require('./db/mongoose'); // Data base connection
const User = require('./models/user');
const Task = require('./models/task');
const app = express();
const port = process.env.PORT || 4001;
const userRouter = require('./routers/user'); // Routing
const taskRouter = require('./routers/task'); // Routing

app.use(express.json()); // Input field conver in a json
app.use(userRouter); // Routing
app.use(taskRouter); // Routing

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.');
});

//const userFind = async () => {
////    const task = await Task.findById('5dd62481b3d5882af4a67bf2');
////    await task.populate('owner').execPopulate()
////    console.log(task)
//
//    const user = await User.findById('5dd3a3d56508fe2dd437c9ab');
//    await user.populate('tasks').execPopulate();
//    console.log(user.tasks);
//};
//userFind();
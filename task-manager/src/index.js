const express = require('express');
require('./db/mongoose'); // Data base connection
//const User = require('./models/user');
//const Task = require('./models/task');
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


//const bcrypt = require('bcryptjs');
//const myFunction = async () => {
//    const password = "Test12345!";
//    const hashePassword = await bcrypt.hash(password, 8); // create
//
//    console.log(password);
//    console.log(hashePassword);
//    const isMatch = await bcrypt.compare(password, hashePassword); // compare
//    console.log(isMatch);
//};
//
//myFunction();
const express = require('express');
require('./db/mongoose'); // Data base connection
const userRouter = require('./routers/user'); // Routing
const taskRouter = require('./routers/task'); // Routing

const app = express();
//const port = process.env.PORT || 4002;

app.use(express.json()); // Input field conver in a json
app.use(userRouter); // Routing
app.use(taskRouter); // Routing


module.exports = app

//app.listen(port, () => {
//    console.log('Server is up on port ' + port + '.');
//});
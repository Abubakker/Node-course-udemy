const express = require('express');
require('./db/mongoose'); // Data base connection
//const User = require('./models/user');
//const Task = require('./models/task');
const app = express();
const port = process.env.PORT || 4001;
const userRouter = require('./routers/user'); // Routing
const taskRouter = require('./routers/task'); // Routing

// Middleware

//app.use((req, res, next) => {
//    if (req.method === 'GET') {
//        res.send('Get off')
//    } else {
//        next();
//    }
////    console.log(req.method, req.path);
////    next();
//});

//app.use((req, res, next) => {
//    res.status(503).send('The site is currently down. Check after 8:00 am!');
////    if (req.method === 'GET') {
////        res.status(503).send('Get method off');
////    } else {
////        next();
////    }
//});
// Middleware

app.use(express.json()); // Input field conver in a json
app.use(userRouter); // Routing
app.use(taskRouter); // Routing

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.');
});

//const jwt = require('jsonwebtoken');
//
//const myJwtFunction = async () => {
//    const token = jwt.sign({_id: 'bakker123'}, 'thisismynodejscourse', {expiresIn: '7 days'});
//    console.log(token);
//    const data = jwt.verify(token, 'thisismynodejscourse');
//    console.log(data);
//};
//myJwtFunction();

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
const express = require('express');
require('./db/mongoose'); // Data base connection
const User = require('./models/user');
const Task = require('./models/task');
const app = express();
const port = process.env.PORT || 4001;
const userRouter = require('./routers/user'); // Routing
const taskRouter = require('./routers/task'); // Routing

const multer = require('multer');
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return callback(new Error('Please upload a word'));
        }
        callback(undefined, true);
    }
});

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send();
});


app.use(express.json()); // Input field conver in a json
app.use(userRouter); // Routing
app.use(taskRouter); // Routing

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.');
});

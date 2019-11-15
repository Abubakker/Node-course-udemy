const mongoose = require('mongoose');

const connectionUrlDB = 'mongodb://127.0.0.1:27017/task-manager-api';
mongoose.connect(connectionUrlDB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
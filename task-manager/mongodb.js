// CRUD C=Create, R=Read, U=Update, D=Delete

//const mongodb = require('mongodb');
//const MongoClient = mongodb.MongoClient;
//const ObjectID = mongodb.ObjectID;

//Short code upper 3 line
const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

//const id = new ObjectID();
//console.log(id);

MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {  // useUnifiedTopology: true, set for DeprecationWarning
    if (error) {
        return console.log('Unable to connect to database! Please check connection.');
    }
    // console.log('Mongo DB Connected correctly!'); //db.getCollection('users').find({}) // Global Unique Identifier ID

    const db = client.db(databaseName);

//    // Create one collection
//    db.collection('users').insertOne({  // _id: id, auto create
//        name: 'Test user 01',
//        age: 55,
//        location: 'Rajshahi'
//    }, (error, result) => {
//        if (error) {
//            return console.log('Unable to insert the user!');
//        }
//        console.log(result.ops);
//    });

//    // Create many collection
//    db.collection('users').insertMany([
//        {
//            name: 'Abs',
//            age: 50,
//            location: 'Dhaka'
//        },
//        {
//            name: 'Abu',
//            age: 20,
//            location: 'Rajshahi'
//        },
//        {
//            name: 'Abc',
//            age: 18,
//            location: 'Panthopath'
//        }
//    ], (error, result) => {
//        if (error) {
//            return console.log('Unable to insert the documents!');
//        }
//        console.log(result.ops);
//    });

//    // Create many collection
//    db.collection('tasks').insertMany([
//        {
//            description: 'Clean the room.',
//            completed: true
//        },
//        {
//            description: 'Clean your desk.',
//            completed: false
//        },
//        {
//            description: 'Pot plants.',
//            completed: false
//        }
//    ], (error, result) => {
//        if (error) {
//            return console.log('Unable to insert the documents!');
//        }
//        console.log(result.ops);
//    });

//// Read one date
//    db.collection('users').findOne({name: 'bakker'}, (error, userInfo) => {
//        if (error) {
//            return console.log('Unable to fetch the user!');
//        }
//        console.log(userInfo);
//    });

//// Read one specific date
//    db.collection('users').findOne({_id: new ObjectID('5dc4e07e3cdaf208e837d66f')}, (error, userInfo) => {
//        if (error) {
//            return console.log('Unable to fetch the user!');
//        }
//        console.log(userInfo);
//    });

//// Read date to array
//    db.collection('users').find({age: 27}).toArray((error, usersInfo) => {
//        if (error) {
//            return console.log('Unable to fetch the user!');
//        }
//        console.log(usersInfo);
//    });

// Count
//    db.collection('users').find({age: 27}).count((error, usersInfo) => {
//        if (error) {
//            return console.log('Unable to fetch the user!');
//        }
//        console.log(usersInfo);
//    });
// Read uncompleted task
//    db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
//        if (error) {
//            return console.log('Unable to fetch!');
//        }
//        console.log(tasks);
//    });
// Read all
//    db.collection('tasks').find({}).toArray((error, tasks) => {
//        if (error) {
//            return console.log('Unable to fetch!');
//        }
//        console.log(tasks);
//    });

//// Update one
//    const updatePromise = db.collection('users').updateOne({
//        _id: new ObjectID("5dc50c5c007d6e1e74981ce1")
//    }, {
//        $set: {
//            name: "Test user 02 update"
//        }
//    });
//    updatePromise.then((result) => {
//        console.log(result);
//    }).catch((error) => {
//        console.log(error);
//    });

//// Same as Update one
//    db.collection('users').updateOne({
//        _id: new ObjectID("5dc50c5c007d6e1e74981ce1")
//    }, {
//        $set: {
//            name: "Test user 02 update"
//        }
//    }).then((result) => {
//        console.log(result);
//    }).catch((error) => {
//        console.log(error);
//    });
//// Update one or increments a field by a specified value
//    db.collection('users').updateOne({
//        _id: new ObjectID("5dc50c5c007d6e1e74981ce1")
//    }, {
//        $inc: {
//            age: 5
//        }
//    }).then((result) => {
//        console.log(result);
//    }).catch((error) => {
//        console.log(error);
//    });

//    // Update many
//    db.collection('tasks').updateMany({
//        completed: false // condition
//    }, {
//        $set: {
//            completed: true // Change value
//        }
//    }).then((result) => {
//        console.log(result.modifiedCount);
//    }).catch((error) => {
//        console.log(error);
//    });

    
//    // Delete one
//    db.collection('users').deleteOne({
//        age: 66 // condition
//    }).then((result) => {
//        console.log(result);
//    }).catch((error) => {
//        console.log(error);
//    });
    
//    // Delete Many
//    db.collection('users').deleteMany({
//        age: 20 // condition
//    }).then((result) => {
//        console.log(result);
//    }).catch((error) => {
//        console.log(error);
//    });
});
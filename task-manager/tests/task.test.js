const request = require('supertest');
//const jwt = require('jsonwebtoken');
//const mongoose = require('mongoose');
const app = require('../src/app');
//const User = require('../src/models/user');
const Task = require('../src/models/task');
const {
    userOneId,
    userOne,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
} = require('./fixtures/db.js');

beforeEach(setupDatabase);


test('Should create task for user', async() => {
    const response = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send({
                description: 'Form my test'
            })
            .expect(201);
    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false);
});

test('Should not create task for unauthorization user', async() => {
    const response = await request(app)
            .post('/tasks')
            // .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send({
                description: 'Form my test'
            })
            .expect(401);
});

test('Should fetch user tasks', async() => {
    const response = await request(app)
            .get('/tasks')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200);
    expect(response.body.length).toEqual(2);
});

test('Should delete other user tasks', async() => {
    const response = await request(app)
            .delete(`/tasks/${taskOne._id}`)
            .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
            .send()
            .expect(404);
    const task = await Task.findById(taskOne._id);
    expect(task).not.toBeNull();
});
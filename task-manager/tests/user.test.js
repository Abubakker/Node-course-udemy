const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {// For test user
    _id: userOneId,
    name: 'bakker',
    email: 'bakker311042test@gmail.com',
    age: 27,
    password: 'bakker311042',
    tokens: [{
            token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
        }]
};

beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
});



//afterEach(() => {
//    console.log('afterEach');
//});

test('Should signup a new user', async() => {
    const response = await request(app).post('/users').send({
        name: 'bakker',
        email: 'bakker311042@gmail.com',
        age: 27,
        password: 'bakker311042'
    }).expect(201);

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    // Assertion about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'bakker',
            email: 'bakker311042@gmail.com',
            age: 27
        },
        token: user.tokens[0].token
    });
    expect(user.password).not.toBe('bakker311042');
});

test('Should login existing user', async() => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);
    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should not login nonexist user', async() => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'ThisIsNotAValidPass'
    }).expect(400);
});

test('Should get profile for user', async() => {
    await request(app)
            .get('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200);
});

test('Should not get profile for unauthorization user', async() => {
    await request(app)
            .get('/users/me')
            //.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(401);
});

test('Should delete acount for user', async() => {
    await request(app)
            .delete('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200);
    const user = await User.findById(userOneId);
    expect(user).toBeNull();
});

test('Should not delete acount for unauthorization user', async() => {
    await request(app)
            .delete('/users/me')
            //.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(401);
});
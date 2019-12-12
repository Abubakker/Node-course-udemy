const request = require('supertest');
const app = require('../src/app');

test('Should signup a new user', async() => {
    await request(app).post('/users').send({
        name: 'bakker',
        email: 'bakker311042@gmail.com',
        age: 27,
        password: 'bakker311042'
    }).expect(201);
});
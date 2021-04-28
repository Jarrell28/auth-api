'use strict';

const supertest = require('@code-fellows/supergoose');
const { server } = require('../src/server.js');

const mockRequest = supertest(server);

describe('API V1 TESTS', () => {

    it('should create a new item in the DB and return object', async () => {
        const response = await mockRequest.post('/api/v1/users').send({ username: 'admin', password: 'password', role: 'admin' });

        expect(response.status).toBe(201);
        expect(typeof response.body).toBe('object');
    })

    it('should get all items in the DB and return a list', async () => {
        const response = await mockRequest.get('/api/v1/users');

        expect(response.status).toBe(200);
        expect(response.body[0].username).toEqual("admin")
    })

    it('should get one item in the DB and return the object', async () => {
        const testUser = await mockRequest.post('/api/v1/users').send({ username: 'test', password: 'password', role: 'user' });

        const response = await mockRequest.get(`/api/v1/users/${testUser.body._id}`);

        expect(response.status).toBe(200);
        expect(response.body.username).toEqual("test")
    })

    it('should update one item in the DB and return updated object', async () => {
        const testUser2 = await mockRequest.post('/api/v1/users').send({ username: 'test2', password: 'password', role: 'user' });
        const updatedUser = { username: 'updatedUser', password: 'password', role: 'user' };

        const response = await mockRequest.put(`/api/v1/users/${testUser2.body._id}`).send(updatedUser);

        expect(response.status).toBe(200);
        expect(response.body.username).toEqual("updatedUser")
    });

    it('should delete one item in the DB and return deleted object', async () => {
        const testUser3 = await mockRequest.post('/api/v1/users').send({ username: 'test3', password: 'password', role: 'user' });

        const response = await mockRequest.delete(`/api/v1/users/${testUser3.body._id}`);

        expect(response.status).toBe(200);
        expect(typeof response.body).toEqual("object")
    });
})
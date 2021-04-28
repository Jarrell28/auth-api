'use strict';

process.env.SECRET = "testtesttest";

const supertest = require('@code-fellows/supergoose');
const { server } = require('../src/server.js');

const mockRequest = supertest(server);

//Admin to test bearer authentication
let admin;

describe('API V2 TESTS', () => {

    beforeAll(async () => {
        //creating admin user
        const newAdmin = await mockRequest.post('/signup').send({ username: "admin", password: "password", role: "admin" });
        admin = newAdmin.body;
    });


    it('should create a new item in the DB and return object when providing bearer token', async () => {
        const response = await mockRequest.post('/api/v2/users').send({ username: 'test', password: 'password', role: 'user' }).auth(admin.token, { type: 'bearer' });

        expect(response.status).toBe(201);
        expect(typeof response.body).toBe('object');
    })

    it('should get all items in the DB and return a list when providing bearer token', async () => {
        const response = await mockRequest.get('/api/v2/users').auth(admin.token, { type: 'bearer' });

        expect(response.status).toBe(200);
        expect(response.body[0].username).toEqual("admin");
    })

    it('should get one item in the DB and return the object when providing bearer token', async () => {
        const testUser = await mockRequest.post('/api/v2/users').send({ username: 'test2', password: 'password', role: 'user' }).auth(admin.token, { type: 'bearer' });

        const response = await mockRequest.get(`/api/v2/users/${testUser.body._id}`).auth(admin.token, { type: 'bearer' });

        expect(response.status).toBe(200);
        expect(response.body.username).toEqual("test2")
    })

    it('should update one item in the DB and return updated object when providing bearer token', async () => {
        const testUser2 = await mockRequest.post('/api/v2/users').send({ username: 'test3', password: 'password', role: 'user' }).auth(admin.token, { type: 'bearer' });
        const updatedUser = { username: 'updatedUser', password: 'password', role: 'user' };

        const response = await mockRequest.put(`/api/v2/users/${testUser2.body._id}`).send(updatedUser).auth(admin.token, { type: 'bearer' });

        expect(response.status).toBe(200);
        expect(response.body.username).toEqual("updatedUser")
    });

    it('should delete one item in the DB and return deleted object when providing bearer token', async () => {
        const testUser3 = await mockRequest.post('/api/v2/users').send({ username: 'test4', password: 'password', role: 'user' }).auth(admin.token, { type: 'bearer' });

        const response = await mockRequest.delete(`/api/v2/users/${testUser3.body._id}`).auth(admin.token, { type: 'bearer' });

        expect(response.status).toBe(200);
        expect(typeof response.body).toEqual("object")
    });
})
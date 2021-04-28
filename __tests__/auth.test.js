'use strict';

process.env.SECRET = "testtesttest";

const supertest = require('@code-fellows/supergoose');
const { server } = require('../src/server.js');

const mockRequest = supertest(server);

describe('Auth Server Tests', () => {

    it('should create a new user and return an object and token', async () => {
        const response = await mockRequest.post('/signup').send({ username: "admin", password: "password", role: "admin" });

        expect(response.status).toBe(201);
        expect(typeof response.body.user).toBe('object');
        expect(response.body.token).toBeDefined();
    })

    it('should sign in a user using basic authentication', async () => {
        const response = await mockRequest.post('/signin').auth("admin", "password");

        expect(response.status).toBe(200);
        expect(typeof response.body.user).toBe('object');
        expect(response.body.token).toBeDefined();
    })
})
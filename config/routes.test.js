const request = require('supertest');
const server = require('../api/server');

describe('server', () => {
    it('[GET] / WORKS!', () => {
        return request(server)
            // chain a lot of stuff
            .get('/api/jokes')
            .expect(401)
            .expect('Content-Type', /json/)
            .expect('Content-Length', '70')
            .then(res => {
                expect(res.body).toEqual({ error: 'No token provided, must be set on the Authorization Header' });
            });
    });

    it('[POST] /register ALSO WORKS', () => {
        return request(server)
            .post('/api/register')
            .expect(500)
            .then(res => {
                expect(res.body).toBeInstanceOf(Object);
            });
    });
});

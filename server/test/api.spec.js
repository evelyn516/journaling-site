/** 
 * @jest-environment jsdom
 */

const { application } = require('express');
const request = require('supertest');
// import server
const app = require('../app');

describe('API server', () => {
    let api;

    beforeAll(() => {
        // start the server on a different port
        api = app.listen(5000, () => {
            console.log('Test server running on port 5000.')
        });
    });

    afterAll((done) => {
        // close the server, then run done
        console.log('Stopping the test server');
        api.close(done);
    });

    it('responds to get / with status 200', (done) => {
        request(api).get('/').expect(200, done);
    })
})



const request = require('supertest');
// import server
const app = require('./app');

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
        request(api)
        .get('/')
        .expect(200, done);
    })

    it('shows story data and responds to get /entries with status 200', (done) => {
        request(api)
        .get('/entries')
        .send({ id: 0, emoji: 'like' })
        .expect(200, done);
    })

    it('posts a new story', (done) => {
        request(api)
        .post('/entries')
        .send({title: "new title", story: 'new story', id: 0})
        .expect(200, done)
    })

    it('new reaction added', (done) => {
        request(api)
        .put('/emojiUpdate')
        .expect(200, done);
    });
    
    it('new comment added', (done) => {
        request(api)
        .put('/comments')
        .send({comment: "new comment"})
        .expect(201, done);
    }); 
})




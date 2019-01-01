const request = require('supertest');
const expect = require('expect');

describe('Server', () => {
    var app = require('./server').app;

    it('should return Hello world! respose', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .expect('Hello world!')
            .end(done);
    });

    it('should verify json object', (done) => {
        request(app)
            .get('/error')
            .expect(404)
            .expect({ error: 'Page not found.' })
            .end(done)
    });

    // more flexibility
    it('should verify arbitrary field in res', (done) => {
        request(app)
            .get('/error')
            .expect((res) => {
                // we can verify any field in res in here
                // console.log(res);
            })
            .end(done)
    })

    // or
    it('should verify content in body', (done) => {
        request(app)
            .get('/error')
            .expect((res) => {
                expect(res.body).toMatchObject({ error: 'Page not found.' })
            })
            .end(done);
    });
});
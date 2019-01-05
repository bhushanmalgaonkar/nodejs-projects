const expect = require('expect')
const request = require('supertest');

const {app} = require('../server');
const {Todo} = require('../models/todo');

beforeEach((done) => {
    Todo.deleteMany({}).then(() => done());
});

describe('POST /todo', () => {
    it('should create a new todo', (done) => {
        var text = 'new todo';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err)
                    return done(err);

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((err) => done(err));
            })
    });

    it('should not create a new todo without text data', (done) => {
        request(app)
            .post('/todos')
            .expect(400)
            .end((err, res) => {
                if (err)
                    return done(err);
                
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(0);
                    done();
                }).catch((err) => done(err));
            });
    });

    it('should not create a new todo with empty text data', (done) => {
        var text = '              ';

        request(app)
            .post('/todos')
            .send({text})
            .expect(400)
            .end((err, res) => {
                if (err)
                    return done(err);
                
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(0);
                    done();
                }).catch((err) => done(err));
            });
    }); 
});
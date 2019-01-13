const expect = require('expect')
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../server');
const {Todo} = require('../models/todo');

var dummyData = [
    { _id: new ObjectID(), text: 'pet the cat' },
    { _id: new ObjectID(), text: 'walk the dog' },
    { _id: new ObjectID(), text: 'eat dinner', completed: true, completedAt: 123 }
]

beforeEach((done) => {
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(dummyData);
    }).then(() => done());
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

                Todo.find({text}).then((todos) => {
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
                    expect(todos.length).toBe(dummyData.length);
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
                    expect(todos.length).toBe(dummyData.length);
                    done();
                }).catch((err) => done(err));
            });
    }); 
});

describe('GET /todos', () => {
    it('should get all the todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(dummyData.length);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => { 
    it('should return note when valid id is passed', (done) => {
        var note = dummyData[0];
        request(app)
            .get(`/todos/${note._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(note._id.toHexString());
                expect(res.body.todo.text).toBe(note.text);
            })
            .end(done);
    });

    it('should return 404 for valid object id that does not exists in database', (done) => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for invalid object id', (done) => {
        request(app)
            .get(`/todos/aabbccddeeffgghhiijj`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo when valid id is passed', (done) => {
        var hexId = dummyData[0]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err)
                    return done(err);
                
                Todo.findById(hexId).then((todo) => {
                    console.log(todo);
                    expect(todo).toBeNull();
                    done();
                })
                .catch((err) => done(err));
            })
    });

    it('should return 404 if todo with id does not exist', (done) => {
        var hexId = new ObjectID().toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if todo id is invalid', (done) => {
        var hexId = 'abcde';

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update text a todo with given id', (done) => {
        var hexId = dummyData[1]._id.toHexString();

        var text = 'Text updated by testcase';
        var completed = true;

        request(app)
            .patch(`/todos/${hexId}`)
            .send({text, completed})
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(completed);
                expect(typeof res.body.todo.completedAt).toBe('number');
            })
            .end(done);
    });

    it('should clear completedAt when todo is set to not completed', (done) => {
        var hexId = dummyData[2]._id.toHexString();

        var text = 'Text updated by testcase';
        var completed = false;

        request(app)
            .patch(`/todos/${hexId}`)
            .send({text, completed})
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(completed);
                expect(res.body.todo.completedAt).toBe(null);
            })
            .end(done);
    })
});
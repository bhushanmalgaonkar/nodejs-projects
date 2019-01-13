const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

require('./config/config');

var app = express();
const port = process.env.PORT || 3000;

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
})

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        // res.send(todos);
        // sending response directly as an array would make futures modifications difficult. 
        // e.g. if we have to add more data to response
        // better way is to return an object with todos as property
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(404).send();
    
    Todo.findOne({_id: req.params.id}).then((todo) => {
        if (!todo)
            return res.status(404).send();
        
        res.send({todo});
    }, (err) => {
        res.status(400).send(err);
    });
});

app.delete('/todos/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(404).send();

    Todo.findByIdAndDelete(req.params.id).then((todo) => {
        if (!todo)
            return res.status(404).send();
        
        res.send({todo});
    }, (err) => {
        res.status(400).send(err);
    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id))
        return res.status(404).send();

    // we only want to update certain properties
    // not ones not-specified in model or fields such as completedAt
    var body = _.pick(req.body, ['text', 'completed']);

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo)
            return res.status(404).send();
        
        res.send({todo});
    }).catch((err) => {
        res.status(404).send();
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

module.exports = {
    app
}
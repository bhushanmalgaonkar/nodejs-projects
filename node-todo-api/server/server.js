const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

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

app.listen(port, () => {  
    console.log(`Listening on port ${port}...`);
});

module.exports = {
    app
}
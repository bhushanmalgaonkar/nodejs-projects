const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

var todo = new Todo({
    text: 'Feed the cat'
});

todo.save().then((doc) => {
    console.log('Saved todo', doc);
}, (err) => {
    console.log('Error saving todo', err);
});

var user = new User({
    email: 'johndoe@gmail.com'
});

user.save().then((doc) => {
    console.log('Saved user', doc);
}, (err) => {
    console.error('Error saving user', err);
});
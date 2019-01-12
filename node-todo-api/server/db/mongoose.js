const mongoose = require('mongoose');

const databseURI = process.env.MONGODB_URI || 'mongodb://localhost/';
const dbName = 'TodoApp';

// tell mongoose which Promise library to use
mongoose.Promise = global.Promise;
mongoose.connect(databseURI + dbName, {useNewUrlParser: true});

module.exports = {
    mongoose
}
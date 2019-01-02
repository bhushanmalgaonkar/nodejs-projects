const {MongoClient} = require('mongodb');

const databseURI = 'mongodb://localhost:27017'
const dbName = 'TodoApp'

MongoClient.connect(databseURI, {useNewUrlParser: true})
    .then((client) => {
        const db = client.db(dbName);

        db.collection('Todos').updateMany({
            text: 'Eat lunch'
        }, {
            $set: {
                completed: false
            }
        }, {
            returnOriginal: false
        }).then((result) => {
            console.log(result);
        }, (err) => {
            console.log('Error updating document', err);
        });

        db.collection('Users').findOneAndUpdate({
            location: 'Earth'
        }, {
            $inc: {
                age: 1
            }
        }, {
            returnOriginal: false
        }).then((result) => {
            console.log(result)
        });

    }, (err) => {
        console.log('Unable to connect to the database', err);
    });
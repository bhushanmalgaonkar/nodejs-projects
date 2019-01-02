const {MongoClient} = require('mongodb');

const databaseURI = 'mongodb://localhost:27017'
const dbName = 'TodoApp';

MongoClient.connect(databaseURI, {useNewUrlParser: true})
    .then((client) => {
        const db = client.db(dbName);

        // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
        //     console.log(result);
        // }, (err) => {
        //     console.log('Error deleting record', err);
        // });

        // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
        //     console.log(result);
        // });

        db.collection('Todos').findOneAndDelete({text: 'Eat lunch'}).then((result) => {
            console.log(result);
        });

    }, (err) => {
        console.log('Unable to connect to the database', err);
    });
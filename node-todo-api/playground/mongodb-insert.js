const {MongoClient, ObjectID} = require('mongodb');

// Connection url
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'TodoApp';

// MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
//     if (err) {
//         console.log('Unable to connect to the database');
//         return;
//     }
//     console.log('Successfully connected to the database');

//     const todoDb = client.db(dbName);

//     todoDb.collection('Todos').insertOne({
//         text: 'Complete node course',
//         completed: false
//     }, (err, result) => {
//         if (err) {
//             console.log('Unable to insert todo', err);
//         } else {
//             console.log(JSON.stringify(result, undefined, 2));
//         }
//     });

//     client.close();
// });

MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true})
    .then((client) => {
        console.log('Successfully connected to the database');

        const db = client.db(dbName);

        db.collection('Users').insertOne({
            name: 'Bhushan',
            age: 24,
            location: 'Earth'
        })
        .then((result) => {
            console.log(JSON.stringify(result.ops, undefined, 2));
            console.log(result.ops[0]._id.getTimestamp());
        })
        .catch((err) => {
            console.log('Unable to insert todo record', err);
        });

        client.close();
    })
    .catch((err) => {
        console.log('Unable to connect to database', err);
    });
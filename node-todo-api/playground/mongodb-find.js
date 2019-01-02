const {MongoClient, ObjectID} = require('mongodb');

const databaseURI = 'mongodb://localhost:27017/';
const dbName = 'TodoApp';

MongoClient.connect(databaseURI, {useNewUrlParser: true}).then((client) => {
    const db = client.db(dbName);

    db.collection('Todos').find({completed: true}).toArray().then((docs) => {
        console.log('Find all completed...');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Error retrieving documents', err);
    });

    db.collection('Todos').find({
        _id: new ObjectID('5c2be142094b863e94e2ae40')       // _id: '5c2be142094b863e94e2ae40' will not work as id is stored as object
    }).toArray().then((docs) => {
        console.log('Find by id...');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Error retrieving documents', err);
    })


    // db.close()
}, (err) => {
    console.log('Unable to connect to database', err);
});
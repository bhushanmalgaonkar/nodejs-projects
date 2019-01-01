const express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.status(200).send('Hello world!');
});

app.get('/error', (req, res) => {
    res.status(404).send({
        error: 'Page not found.'
    });
});

app.listen(3000);
module.exports.app = app;
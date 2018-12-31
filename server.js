const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();


hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.set('view engine', 'hbs');

// custom middleware
app.use((req, res, next) => {
    var log = `${new Date().toString()} ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Error writing log: ' + log);
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance');
// });

// make static files available
app.use(express.static(__dirname + '/public'));

// middlewares are called one by one in the order they are written. 

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to my first express.js site',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
    });
});

// send html content
app.get('/html', (req, res) => {
    res.send('<h1>Hi there!</h1>')
});

// send json content
app.get('/json', (req, res) => {
    res.send({
        name: 'Bhushan',
        likes: [
            'music',
            'movies'
        ]
    });
});

app.listen(3000, () => {
    console.log('Server is started on port 3000..');
});
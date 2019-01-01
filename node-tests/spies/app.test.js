const expect = require('expect');
const rewire = require('rewire');
const jest = require('jest-mock');

var app = rewire('./app');
// rewire loads js file through require, in addition provides two more functions
// app.__set__
// app.__get__
// we can use these function to mock different objects in app.js

describe('App', () => {
    var db = {
        saveUser: jest.fn()
    };
    app.__set__('db', db);

    it('should call saveUser with user object', () => {
        var email = 'bhushan@gmail.com';
        var password = '123abc';

        app.handleSignup(email, password);
        expect(db.saveUser).toHaveBeenCalledWith({email, password});
    });
});
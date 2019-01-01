const expect = require('expect');

const utils = require('./utils');

// using default error object
it('should add two numbers', () => {
    var res = utils.add(10, 23);
    if (res !== 33) {
        throw new Error(`Expected 33, but got ${res}`);
    }
});

// with expect module
it('should square a number', () => {
    var res = utils.square(9);
    var e = expect(res).toBe(81);
});

// objects and arrays
it('should compare the objects', () => {
    // expect({'name': 'bhushan'}).toBe({'name': 'bhushan'}); // toBe does not work with object and arrays
    expect({'name': 'bhushan'}).toEqual({'name': 'bhushan'});
});

// include
it('should contain 3', () => {
    expect([2, 3, 4]).toContain(3);
});

// check if object exists as an element of array
it('should contain an object', () => {
    expect([{
        name: 'Bhushan',
        age: 24,
        job: 'Software Engineer'
    }]).toContainEqual({
        name: 'Bhushan',
        age: 24,
        job: 'Software Engineer'
    });
});

// check if some key-value pair exists in given object
it('should include key:value pairs', () => {
    expect({
        name: 'Bhushan',
        age: 24,
        job: 'Software Engineer'
    }).toMatchObject({
        name: 'Bhushan'
    });
});

it('should set first and last name', () => {
    var user = {age: 25};
    var user = utils.setName(user, 'John Doe');
    expect(user).toMatchObject({
        firstname: 'John',
        lastname: 'Doe'
    });
});

// test async functions
// without done, the callback function of 'it' returns without executing the assertion
// so it will always return as test-case passed
it('should add two number asynchronously', (done) => {
    utils.asyncAdd(5, 7, (sum) => {
        expect(sum).toBe(12);
        done();
    });
});
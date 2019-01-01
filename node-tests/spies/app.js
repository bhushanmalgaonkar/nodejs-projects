const db = require('./db');


// cheetsheet
// https://devhints.io/jest


// here handleSignup involves multiple function calls
// if we test this function using normal methods, it will involve
// testing all the functions that are called inside this functions recursively

// if we just want to test whether the right functions are called correct arguments
// we can use spies. using rewire module
module.exports.handleSignup = (email, password) => {
    // check if email already exists
    
    // save user to database
    db.saveUser({email, password});

    // send welcome email to user
};
module.exports.add = (a, b) => a + b;
module.exports.square = (x) => x * x;
module.exports.setName = (user, fullName) => {
    var names = fullName.split(' ');
    user.firstname = names[0];
    user.lastname = names[1];
    return user
}

module.exports.asyncAdd = (a, b, callback) => {
    setTimeout(() => {
        callback(a + b);
    }, 100);
};
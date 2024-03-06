const userResolver = require('./user');
const rolesResolver = require('./roles');

module.exports = [
    userResolver,
    rolesResolver,
]
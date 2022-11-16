const jwt = require('jsonwebtoken');
const env = require("../.env")
require('dotenv').config();


// jwt token
function tokenJwt(users) {
    const tokenData = {
        id: users.id,
        role: users.role,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
    }
    const token = jwt.sign(tokenData, SECRET_KEY);
    return token;
};

module.exports = { tokenJwt }
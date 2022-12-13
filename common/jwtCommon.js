const jwt = require('jsonwebtoken');
const env = require("../.env");


// jwt token
exports.tokenJwt = (users) => {
    const tokenData = {
        id: users.id,
        role: users.role,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
    };
    const token = jwt.sign(tokenData, SECRET_KEY);
    return token;
};

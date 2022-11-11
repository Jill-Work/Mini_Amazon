const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const usersService = require("../users/usersServices");
const bcrypt = require('bcrypt');
require('dotenv').config();


// jwt token
function tokenJwt(users) {
    const tokenData = {
        id: users.dataValues.id,
        role: users.dataValues.role,
        firstName: users.dataValues.firstName,
        lastName: users.dataValues.lastName,
        email: users.dataValues.email,
    }
    const token = jwt.sign(tokenData, SECRET_KEY);
    return token;
};

module.exports = { tokenJwt }
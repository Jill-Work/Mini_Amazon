const express = require('express');
const app = express();
const model = require("../models/db");
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const string = require("string-sanitizer");

exports.userAuth = (req, res, next) => {
    const authorization = req.headers['authorization'];
    const tokenId = authorization && authorization.split(' ')[1];

    if (authorization == null) return res.status(404).json({ error: "Token is Null" })
    jwt.verify(tokenId, SECRET_KEY, async (err, user) => {
        if (err) {
            res.status(404).json({
                error: err.message
            })
        } else {
            const routes = req.path;
            const incomingData = user.role;
            const dbAuth = await model.routeAuth.findOne({ where: { "role": incomingData, routes } })
            const dbData = dbAuth.dataValues.role
            if ((dbData == incomingData) || (incomingData == "ADMIN")) {
                console.log("auth middleware check is done");
                req.user = user
                next();
            } else {
                res.status(403).json({
                    'error': 'you are not authorize to this page'
                })
                return;
            }
        }
    })
};

// insert user
exports.insertUsers = (req, res, next) => {
    const validation = Joi.object({
        role: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        contactNumber: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        confirmPassword: Joi.string().required(),
    })
        .unknown(false);//.unknown(true)
    const { error } = validation.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ "error": error.message })
    } else {
        const incomingData = req.body;
        incomingData.role = string.sanitize.removeNumber(incomingData.role);
        incomingData.firstName = string.sanitize.removeNumber(incomingData.firstName);
        incomingData.lastName = string.sanitize.removeNumber(incomingData.lastName);
        // incomingData.email = string.validate.isEmail(incomingData.email)     //email validation
        incomingData.role = incomingData.role.toUpperCase();
        incomingData.firstName = incomingData.firstName.charAt(0).toUpperCase() + incomingData.firstName.slice(1);
        incomingData.lastName = incomingData.lastName.charAt(0).toUpperCase() + incomingData.lastName.slice(1);
        console.log("insert middleware check is done");
        next();
    }
};

exports.updateUser = (req, res, next) => {
    const incomingData = req.body;
    incomingData.firstName = string.sanitize.removeNumber(incomingData.firstName);
    incomingData.lastName = string.sanitize.removeNumber(incomingData.lastName);
    // incomingData.email = string.validate.isEmail(incomingData.email)     //email validation
    req.body.firstName = incomingData.firstName.charAt(0).toUpperCase() + incomingData.firstName.slice(1);
    req.body.lastName = incomingData.lastName.charAt(0).toUpperCase() + incomingData.lastName.slice(1);
    console.log("update middleware check is done");
    next();
};


exports.logIn = (req, res, next) => {
    const validation = Joi.object({
        role: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    }).unknown(false);//.unknown(true)
    const { error } = validation.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({ "error": error.message })
    } else { 
        console.log("middleware check is done");
        next(); 
    }
};

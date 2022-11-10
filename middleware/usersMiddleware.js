const express = require('express');
const Joi = require('joi');
const app = express();
const jwt = require('jsonwebtoken');
const model = require("../models/db");
var string = require("string-sanitizer");

exports.userAuth = (req, res, next) => {

    const authorization = req.headers['authorization'];
    const tokenId = authorization && authorization.split(' ')[1];

    if (authorization == null) return res.status(404).json({ error: "Token is Null" })

    jwt.verify(tokenId, SECRET_KEY, async (err,  user) => {
        if (err) {
            res.status(404).json({
                error: err.message
            })
        } else {
                const routes = req.path;
                const incomingData = user.role
                const dbAuth = await model.routeauth.findOne({ where: { "role": incomingData, routes } })
                const dbData = dbAuth.dataValues.role
                if ((dbData == incomingData)||(incomingData == "ADMIN")) {
                        console.log("middleware check is done");
                        req.user = user
                        next();
                }else{
                    res.status(403).json({
                        'error': 'you are not authorize to this page'
                    })
                    return;
                }
        }
    })
};


exports.insertusers = (req, res, next) => {

    const validation = Joi.object({
        role: Joi.string().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().min(3).max(20).required(),
        contact_num: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        conpassword: Joi.string().required(),

    })
        .unknown(false);//.unknown(true)
    const { error } = validation.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ "error": error.message })
    } else {
        const incomingData = req.body;
        incomingData.role = string.sanitize.removeNumber(incomingData.role);
        incomingData.first_name = string.sanitize.removeNumber(incomingData.first_name);
        incomingData.last_name = string.sanitize.removeNumber(incomingData.last_name);
        // incomingData.email = string.validate.isEmail(incomingData.email)     //email validation
        req.body.role = incomingData.role.toUpperCase();
        req.body.first_name = incomingData.first_name.charAt(0).toUpperCase() + incomingData.first_name.slice(1)
        req.body.last_name = incomingData.last_name.charAt(0).toUpperCase() + incomingData.last_name.slice(1)
        next();
    }
};

exports.updateUser = (req, res, next) => {
    const incomingData = req.body;
    incomingData.first_name = string.sanitize.removeNumber(incomingData.first_name);
    incomingData.last_name = string.sanitize.removeNumber(incomingData.last_name);
    // incomingData.email = string.validate.isEmail(incomingData.email)     //email validation
    req.body.first_name = incomingData.first_name.charAt(0).toUpperCase() + incomingData.first_name.slice(1)
    req.body.last_name = incomingData.last_name.charAt(0).toUpperCase() + incomingData.last_name.slice(1)
    next();
};


exports.logIn = (req,res,next) => {
    const validation = Joi.object({
        role: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    }).unknown(false);//.unknown(true)
    const { error } = validation.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({ "error": error.message })
        } else { next(); }
};

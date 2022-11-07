const express = require('express');
const Joi = require('joi');
const app = express();
const jwt = require('jsonwebtoken');
const model = require("../models/db");
var string = require("string-sanitizer");



exports.userAuth = (req, res, next) => {
    const authorization = req.headers['authorization'];
    const tokenId = authorization && authorization.split(' ')[1];
    
    if (authorization == null)// return res.send("null value");
    {   const data = req.body;
        console.log("req",req.body);
    }
        jwt.verify(tokenId, SECRET_KEY, async (err, user) => {
        if (err) {
            res.status(404).json({
                error: err.message
            })
        } else {
            try {
                const routes = req.path;
                const incomingRole = user.email.role
                console.log(incomingRole);
                const dbAuth = await model.routeauth.findOne({ where: { "role": incomingRole, routes } })
                const dbRole = dbAuth.dataValues.role
                if ((dbRole === incomingRole)||(incomingRole === "ADMIN")) {
        
                    const query = req.query.email;
                    if ((user.email.email == query)||(incomingRole === "ADMIN")) {
                        console.log("done in middleware")
                        next();
                    } else {
                        res.status(404).json({
                            error: "USER NOT FOUND"
                        })
                    }
                }
            } catch (error) {
                res.status(401).json({
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
        req.body.first_name = incomingData.first_name.charAt(0).toUpperCase()+incomingData.first_name.slice(1)
        req.body.last_name = incomingData.last_name.charAt(0).toUpperCase()+incomingData.last_name.slice(1)
        next();
    }
};

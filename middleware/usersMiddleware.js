const express = require('express');
const Joi = require('joi');
const app = express();
const jwt = require('jsonwebtoken');
const model = require("../models/db");


exports.userAuth = (req, res, next) => {

    const authorization = req.headers['authorization'];
    const tokenId = authorization && authorization.split(' ')[1];

    if (authorization == null) return res.send("null value");

    jwt.verify(tokenId, SECRET_KEY, async (err, user) => {
        if (err) {
            res.send("error is  " + err)
        } else {
            try {
                const routes = req.path;
                const incomingData = user.email.role
                const dbAuth =  await model.routeauth.findOne( {where:{"role":incomingData,routes}} )
                const dbData = dbAuth.dataValues.role
            
                if (dbData === incomingData) {
                
                    const query = req.query.email;
                     if (user.email.email == query) {
                        console.log("done")
                        next();
                    } else {
                        res.send({
                            message: "NOT FOUND"
                        });
                    }
                } 
            } catch (error) {
                res.status(403).json ({
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

    }).unknown(false);//.unknown(true)
    const { error } = validation.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json(
            {
                "error": error.message
            }
        )
    } else {
        const incomingData = req.body.role;
        const upperCase = incomingData.toUpperCase();
        req.body.role = upperCase;
        console.log("upperCase",upperCase);
        next();
    }
};
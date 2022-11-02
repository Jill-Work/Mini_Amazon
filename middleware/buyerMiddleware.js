const express = require('express');
const Joi = require('joi');
const app = express();
var validator = require("email-validator");




exports.insertBuyer = (req, res, next) => {
    validator.validate("test@email.com"); // true

    const validation = Joi.object({
        first_name:Joi.string().required(),
        last_name:Joi.string().min(3).max(20).required(),
        contact_num:Joi.string().required(),
        email: Joi.string().required(),
        password:Joi.string().required(),
        conpassword:Joi.string().required(),
        
    }).unknown(false);//.unknown(true)
    const { error } = validation.validate(req.body,{abortEarly:false});
    if (error) {
        return res.status(400).json(
            {
                "error": error.message
            }
        )
    } else {
        next();
    }
  };
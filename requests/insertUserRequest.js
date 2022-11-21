// insert user
const Joi = require('joi');
const string = require("string-sanitizer");

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
        return res.status(400).json({ "error": error.message });
    } else {
        const incomingData = req.body;
        incomingData.role = string.sanitize.removeNumber(incomingData.role);
        incomingData.firstName = string.sanitize.removeNumber(incomingData.firstName);
        incomingData.lastName = string.sanitize.removeNumber(incomingData.lastName);
        // incomingData.email = string.validate.isEmail(incomingData.email)     //email validation
        incomingData.role = incomingData.role.toUpperCase();
        incomingData.firstName = incomingData.firstName.charAt(0).toUpperCase() + incomingData.firstName.slice(1);
        incomingData.lastName = incomingData.lastName.charAt(0).toUpperCase() + incomingData.lastName.slice(1);
        console.log("insert request check is done");
        next();
    }
};
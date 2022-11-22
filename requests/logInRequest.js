const Joi = require('joi');

exports.logIn = (req, res, next) => {
    console.log("hello");
    const validation = Joi.object({
        role: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    }).unknown(false);//.unknown(true)
    const { error } = validation.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({ "error": error.message });
    } else {
        console.log("middleware check is done");
        next();
    }
};

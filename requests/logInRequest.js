const Joi = require('joi');

exports.checkLoginParameter = (req, res, next) => {
    const validation = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }).unknown(false);//.unknown(true)
    const { error } = validation.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({ "error": error.message });
    } else {
        console.log("LogIn Validation Check Successfully");
        next();
    }
};

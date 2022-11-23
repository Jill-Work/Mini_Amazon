const Joi = require('joi');

exports.insertProduct = (req, res, next) => {
    const validation = Joi.object({
        productName: Joi.string().required(),
        seller: Joi.string(),
        image: Joi.string(),
        brand: Joi.string().required(),
        category: Joi.string().valid('Clothes', 'Laptops', 'Mobiles'),
        price: Joi.number().required(),
        description: Joi.string(),
        stock: Joi.string().required()

    }).unknown(false);//.unknown(true)
    const { error } = validation.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ error: err.message });
    } else {
        next();
    }
};



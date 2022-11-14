const model = require("../models/db");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;
require('dotenv').config({ path: './../.env' });

// get cart
exports.getCart = async (id) => {
    const condition = id ? { where: { id } } : {}
    return await model.cart.findAll(condition)
};

// Search cart
exports.getCartHistory = async (req, res) => {
    console.log("Req Query", req.query.search);
    let where = {};
    if (req.query.search) {
        where = {
            [Op.or]: [
                { cartName: { [Op.like]: '%' + req.query.search + '%' } },
            ],
        }

    }

    if (req.query.filters) {
        if (req.query.filters.category) {
            where = {
                ...where,
                category: req.query.filters.category
            }
        }
        if (req.query.filters.brand) {
            where = {
                ...where,
                category: req.query.filters.brand
            }
        }
        if (req.query.filters.price) {
            where = {
                ...where,
                category: req.query.filters.price
            }
        }
        console.log(req.query.filters);
    }

    console.log("where", where);

    let condition = {
        where,
        order: [
            ['id', 'DESC']
        ]
    };

    if (req.query.limit && req.query.offset) {
        condition = {
            ...condition,
            limit: parseInt(req.query.limit),
            offset: parseInt(req.query.offset)
        }
    }

    const cartsHistory = await model.cart.findAll(condition);
    const count = cartsHistory ? cartsHistory.length : 0
    if (cartsHistory) {
        return { cartsHistory, count }
    } else {
        return null
    }

}

// insert cart
exports.addCart = async (data) => {
    return await model.cart.create(data);
};

// delete cart
exports.deleteCart = async (id) => {
    return await model.cart.destroy({ where: { id } });
};


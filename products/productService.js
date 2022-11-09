const model = require("../models/db");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;
require('dotenv').config({ path: './../.env' });

// get product
exports.getProduct = async (id) => {
    const condition = id ? { where: { id } } : {}
    return await model.product.findAll(condition)
};

// Search Product
exports.getProductHistory = async (req, res) => {
    console.log("Req Query", req.query.search);
    let where = {};
    if (req.query.search) {
        where = {
            [Op.or]: [
                { productName: { [Op.like]: '%' + req.query.search + '%' } },
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

    const productsHistory = await model.product.findAll(condition);
    const count = productsHistory ? productsHistory.length : 0
    if (productsHistory) {
        return { productsHistory, count }
    } else {
        return null
    }

}

// insert product
exports.addProduct = async (data) => {
    return await model.product.create(data);
};


// update product
exports.updateProduct = async (id, update) => {
    return await model.product.update(update, { where: { id } });
};


// delete product
exports.deleteProduct = async (id) => {
    return await model.product.destroy({ where: { id } });
};


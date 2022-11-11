const model = require("../models/db");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

// get product
exports.getProduct = async (id) => {
    const condition = id ? { where: { id } } : {}
    return await model.product.findAll(condition)
};

// Search Product
exports.getProductHistory = async (req, res) => {
    const { search, filters, limit, offset } = req.query;
    let where = {};
    if (search) {
        where = {
            [Op.or]: [
                { productName: { [Op.like]: '%' + search + '%' } },
            ],
        }

    }

    if (filters) {
        if (filters.category) {
            where = {
                ...where,
                category: filters.category
            }
        }
        if (filters.brand) {
            where = {
                ...where,
                brand: filters.brand
            }
        }
        if (filters.price) {
            where = {
                ...where,
                price: filters.price
            }
        }
        console.log(filters);
    }

    console.log("where", where);

    let condition = {
        where,
        order: [
            ['id', 'DESC']
        ]
    };

    if (limit && offset) {
        condition = {
            ...condition,
            limit: parseInt(limit),
            offset: parseInt(offset)
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
    const product = await model.product.update(update, { where: { id } });
    return product;
};


// delete product
exports.deleteProduct = async (id) => {
    return await model.product.destroy({ where: { id } });
};


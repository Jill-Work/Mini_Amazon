const model = require("../models/db");
const common = require("../common/indexOfCommon");
const { Op } = require("sequelize");
const cacheData = require("../requests/usersCacheRequest");

// get product
exports.getProduct = async (id) => {
    const data = await model.product.findOne({ where: { id } });
    return common.nullCheckWithDataValues(data);
};

// list of product
exports.getProductList = async (condition) => {
    const data = findAll(condition)
    return common.nullCheckWithOutDataValues(data);
};

// insert product
exports.addProduct = async (data) => {
    const newProduct = await model.product.create(data);
    await cacheData.setCacheData(`productCache${newProduct.dataValues.id}`, data);
    return common.nullCheckWithOutDataValues(data);
};

// update stock ,  price
exports.updateProduct = async (id, update) => {
    await model.users.update(update, { where: { id } });
    const data = await model.users.findOne({ where: { id } });
    await cacheData.setCacheData(`productCache${data.dataValues.id}`, data);
    return common.nullCheckWithDataValues(data);
};

// delete product
exports.deleteProduct = async (id) => {
    return await model.product.destroy({ where: { id } });
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

    }



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




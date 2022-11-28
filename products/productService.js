const model = require("../models/db");
const Sequelize = require("sequelize");
const common = require("../common/indexOfCommon");
const Op = Sequelize.Op;

// get product
exports.getProduct = async (id) => {
    const data = await model.product.findOne({where : id});
    return common.nullCheckWithDataValues(data);
};

// list of product
exports.productList = async (condition) => {
    const data = findAll(condition)
    return common.nullCheckWithOutDataValues(data)
};

// insert product
exports.addProduct = async (data) => {
    return await model.product.create(data);
};

// update stock ,  price
exports.updateStock = async (id, update) => {
    return await model.product.update({ update }, { where: { id } });
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




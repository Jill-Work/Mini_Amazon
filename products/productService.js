const model = require("../models/db");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

// get product
exports.getProduct = async (id) => {
    const condition = id ? { where: { id } } : {}
    const product = await model.product.findOne(condition)
    return product.dataValues;
};


//jill -------
// one product

exports.getOneProduct = async (id) => {
    const data = await model.product.findOne({where:{id},
            include: [{
                model: model.users,
                attributes: ['id','role']  
            }]
        });
    return data.dataValues;
};

exports.cartCheck = async (data) => {
    const user = await model.cart.findOne({
        where:{ buyer_id:data.buyerId , product_id:data.productId }
    });
    if (user == null) {
        return null;
    } else {
        return user.dataValues;
    }
}


// find product before add
exports.checkIfExits = async (data) => {
    const user = await model.product.findOne({
        where: {
            [Op.and]: [
                { sellerId: data.sellerId },
                { productName: data.productName },
                { brand: data.brand },
                { category: data.category },
                { price: data.price }
            ]
        }
    });
    if (user == null) {
        return null;
    } else {
        return user.dataValues;
    }
};

exports.updateStock = async (id,stock) => {
    return await model.product.update({stock},{where:{id}});
}
//jill -------



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


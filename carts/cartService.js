const model = require("../models/db");
const { Op } = require('sequelize');
const common = require("../common/indexOfCommon");


// get cart all product
exports.getCartAllProduct = async (buyer_id) => {
    const data = await model.cart.findAll({ where: { buyer_id } });
    return common.nullCheckWithOutDataValues(data)
};

//sum of cart value
exports.sum = async (data) => {
    const total = await model.cart.sum(data);
    return common.nullCheckWithOutDataValues(total);
};

// add and update to cart
exports.addAndUpdateToCart = async (cartData, buyerId, productId, quantity) => {
    const foundItem = await model.cart.findOne({ where: { buyerId, productId } });
    if (!foundItem) {
        const data = await model.cart.create(cartData);
        return common.nullCheckWithDataValues(data);
    } else {
        await model.cart.update({ quantity }, { where: { buyerId, productId } });
        return common.nullCheckWithOutDataValues("quantity is updated successfully");
    }
};

// delete cart
exports.deleteFromCart = async (buyerId, productId) => {
    return await model.cart.destroy({
        where: {
            [Op.and]: [
                { buyerId },
                { productId }
            ]
        }
    });
};

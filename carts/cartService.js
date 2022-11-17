const model = require("../models/db");
const { where, Op } = require('sequelize');


// get cart
exports.getCart = async (id) => {
    return await model.cart.findAll(id)
};

// get cart all product
exports.getCartAllProduct = async (id) => {
    return await model.cart.findAll({ where: { buyer_id: id } });
}

// add and update to cart
exports.addAndUpdateToCart = async (cartData, buyerId, productId, quantity) => {
    const foundItem = await model.cart.findOne({ where: { buyerId, productId } });
    if (!foundItem) {
        return await model.cart.create(cartData);
    } else {
        return await model.cart.update({ quantity }, { where: { buyerId, productId } })
    }
};

// delete cart
exports.deleteFromCart = async (buyerId, productId) => {
    return await model.cart.destroy({
        where: {
            [Op.and]: [
                { buyerId },
                { productId }
            ]}
    });
};

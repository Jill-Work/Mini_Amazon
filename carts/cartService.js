const model = require("../models/db");
const { Op } = require('sequelize');
const common = require("../common/indexOfCommon");


// get cart all product
exports.getCartAllProduct = async (buyer_id) => {
    const data = await model.cart.findAll({ where: { buyer_id :"27a365ab-a224-4af0-b3fa-bd54d4460a1c" } });
    console.log(...data);
    return common.nullCheck(...data);
};

//sum of cart value
exports.sum = async (data) => {
    const sumOfValue = await model.cart.sum(data);
    return common.nullCheck(sumOfValue);
};

// add and update to cart
exports.addAndUpdateToCart = async (cartData, buyerId, productId, quantity) => {
    const foundItem = await model.cart.findOne({ where: { buyerId, productId } });
    if (!foundItem) {
        const data = await model.cart.create(cartData);
        return common.nullCheck(data);
    } else {
        const data = await model.cart.update({ quantity }, { where: { buyerId, productId } });
        return common.nullCheck(data);
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

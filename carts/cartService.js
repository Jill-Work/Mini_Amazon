const model = require("../models/db");
const { where ,Op } = require('sequelize');


// get cart
exports.getCart = async (id) => {
    return await model.cart.findAll(id)
};

// get cart all product
exports.getCartAllProduct = async (id) => {
    console.log(id);
    const data = await model.cart.findAll({
        where: {
            buyer_id : 2
          }})
          
    return data;
}

// add to cart
exports.addToCart = async (data) => {
    return await model.cart.create(data);
};
// update cart
exports.updateToCart = async(id, quantity) => {
    return await model.cart.update({quantity},{where:{id}})
};

// delete cart
exports.deleteFromCart = async (cartId) => {
    return await model.cart.destroy({ where: { cartId } });
};
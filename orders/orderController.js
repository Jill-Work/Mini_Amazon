const orderService = require("./orderService");
const cartService = require("../carts/cartService");


//  get order
exports.getOrder = async (req,res) => {
    const data = await orderService.getOrder();
}

//  create order

exports.createOrder = async (req,res) => {
    const cart = await cartService.getCartAllProduct(req.user.id);
    console.log(cart.length);
    for (let i = 0; i < cart.length; i++) {
        const element = array[i];
        
    }
    const data = await orderService.createOrder();
};
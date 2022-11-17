const orderService = require("./orderService");


//  get order
exports.getOrder = async (req,res) => {
    const data = await orderService.getOrder();
}

//  create order

exports.createOrder = async (req,res) => {
    const data = await orderService.createOrder();
};
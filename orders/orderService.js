const model = require("../models/db");
const common = require("../common/indexOfCommon");


// get order details
exports.getOrderDetails = async (id) => {
    return await model.order_product.findAll({ where: { order_id: id } });
};

//  create order
exports.createOrder = async (orderData) => {
    const data = await model.order.create(orderData);
    return common.nullCheck(data);
};

//   create order product
exports.createOrderProduct = async (orderProduct) => {
    const data = await model.order_product.create(orderProduct);
    return common.nullCheck(data);
};
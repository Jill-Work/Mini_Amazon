const model = require("../models/db");
const common = require("../common/indexOfCommon");


// get order details
exports.getOrderDetails = async (buyer_id) => {
    console.log(buyer_id);

    return await model.order_product.findAll({ where: { buyer_id } });
};

//  create order
exports.createOrder = async (orderData) => {
    return await model.order.create(orderData);
};

//   create order product
exports.createOrderProduct = async (orderProduct) => {
    const data = await model.order_product.create(orderProduct);
    return common.nullCheckWithDataValues(data);
};
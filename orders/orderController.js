const orderService = require("./orderService");
const cartService = require("../carts/cartService");
const productService = require("../products/productService");


//  get order
exports.getOrder = async (req, res) => {
    const data = await orderService.getOrderDetails(KW);
};

//  create order

exports.createOrder = async (req, res) => {
    const orderData = {
        buyerId: req.user.id,
        address: req.body.address,
        contactNumber: req.body.contactNumber
    };
    const order = await orderService.createOrder(orderData);
    const cart = await cartService.getCartAllProduct(req.user.id);
    for (let i = 0; i < cart.length; i++) {
        const element = cart[i];
        console.log(cart[i].id);
        const getProduct = await productService.getOneProduct(element.productId);
        const orderProduct = {
            orderId: order.id,
            sellerId: cart[i].sellerId,
            productId: cart[i].productId,
            quantity: cart[i].quantity,
            price: getProduct.price,
            total: cart[i].quantity * getProduct.price
        };
        console.log(orderProduct);
        const confirmOrder = await orderService.createOrderProduct(orderProduct);
        const deleteFromCart = await cartService.deleteFromCart(req.user.id,cart[i].productId);
    }
};
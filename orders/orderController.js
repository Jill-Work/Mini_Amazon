const orderService = require("./orderService");
const cartService = require("../carts/cartService");
const productService = require("../products/productService");
const { localsName } = require("ejs");


//  get order
exports.getOrder = async (req, res) => {
    const data = await orderService.getOrderDetails(id);
};

//  create order
exports.createOrder = async (req, res) => {
    const sum = await cartService.sum("total",{where:{buyerId:req.user.id}})
    const orderData = {
        buyerId: req.user.id,
        address: req.body.address,
        contactNumber: parseInt(req.body.contactNumber),
        total:sum,
    };
    const order = await orderService.createOrder(orderData);
    const cart = await cartService.getCartAllProduct(req.user.id);
    for (let i = 0; i < cart.length; i++) {
        const element = cart[i];
        const getProduct = await productService.getOneProduct(element.productId);
        const orderProduct = {
            orderId: order.id,
            sellerId: cart[i].sellerId,
            productId: cart[i].productId,
            quantity: cart[i].quantity,
            price: getProduct.price,
            total: cart[i].quantity * getProduct.price
        };
        await orderService.createOrderProduct(orderProduct);
        await cartService.deleteFromCart(req.user.id,cart[i].productId);
    }
    res.status(200).json({
        message: 'Your order placed successfully, Thankyou for shopping visit again.'
    })
};
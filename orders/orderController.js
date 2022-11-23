const orderService = require("./orderService");
const cartService = require("../carts/cartService");
const productService = require("../products/productService");


//  get order
exports.getOrder = async () => {
    const getOrderDetails = await orderService.getOrderDetails(id);
};

//  create order
exports.createOrder = async (req, res) => {
    const sumOfCartValue = await cartService.sum("total", { where: { buyerId: req.user.id } })
    const orderData = {
        buyerId: req.user.id,
        address: req.body.address,
        contactNumber: parseInt(req.body.contactNumber),
        total: sumOfCartValue,
    };
    const finalOrder = await orderService.createOrder(orderData);
    const cartItems = await cartService.getCartAllProduct(req.user.id);
    for (let i = 0; i < cartItems.length; i++) {
        const element = cartItems[i];
        const productDetails = await productService.getOneProduct(element.productId);
        const orderProduct = {
            orderId: finalOrder.id,
            sellerId: cartItems[i].sellerId,
            productId: cartItems[i].productId,
            quantity: cartItems[i].quantity,
            price: productDetails.price,
            total: cartItems[i].quantity * productDetails.price
        };
        await orderService.createOrderProduct(orderProduct);
        await cartService.deleteFromCart(req.user.id, cartItems[i].productId);
    }
    res.status(200).json({
        message: 'Your order placed successfully, Thankyou for shopping visit again.'
    })
};
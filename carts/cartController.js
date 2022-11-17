const cartService = require("./cartService");
const productService = require("../products/productService");


//  get cart
exports.getCartAllProduct = async (req, res) => {
    const cart = await cartService.getCartAllProduct(req.user.id);
    res.status(200).json(data);
};

//  add to cart
exports.addAndUpdateToCart = async (req, res) => {
    const { productId, quantity } = req.query;
    const buyerId = req.user.id
    const getProduct = await productService.getOneProduct(productId);
    if (getProduct != null) {
        const cartData = {
            buyerId: buyerId,
            sellerId: getProduct.sellerId,
            productId: getProduct.id,
            price: getProduct.price,
            quantity: quantity,
            total: getProduct.price * quantity
        }
        const data = await cartService.addAndUpdateToCart(cartData, buyerId, parseInt(productId), parseInt(quantity));
        res.status(200).json(data);
    } else {
        res.status(403).json({
            message: "Product Not in List"
        })
    }
};

<<<<<<< HEAD
//  update to cart
exports.updateToCart = async (req, res) => {
    const data = await cartService.updateToCart(parseInt(req.query.productId), parseInt(req.query.quantity));
    res.status(200).json(data);
};

=======
>>>>>>> e31aaba3617be781ddb310fae4261b0b42aad1f8
//  delete to cart
exports.deleteFromCart = async (req, res) => {
    const buyerId = req.user.id;
    const productId = req.query.productId
    await cartService.deleteFromCart(buyerId, parseInt(productId));
    res.status(403).json({
        message: "Deleted Item was " + req.query.productId
    })
};

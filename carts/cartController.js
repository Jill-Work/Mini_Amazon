const cartService = require("./cartService");
const productService = require("../products/productService");


//  get cart
exports.getCartAllProduct = async (req, res) => {
    const cart = await cartService.getCartAllProduct(req.user.id);
    res.status(200).json(cart);
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

//  delete to cart
exports.deleteFromCart = async (req, res) => {
    const buyerId = req.user.id;
    const productId = req.query.productId
    await cartService.deleteFromCart(buyerId, parseInt(productId));
    res.status(403).json({
        message: "Deleted Item was " + req.query.productId
    })
};

const cartService = require("./cartService");
const productService = require("../products/productService");



// get cart


//jill
//  get cart
exports.getCartAllProduct = async (req, res) => {
    const cart = await cartService.getCartAllProduct(req.user.id);
    console.log(cart);
    res.send(cart);
};

//  add to cart
exports.addToCart = async (req, res) => {
    const { productId, quantities } = req.query;
    const getProduct = await productService.getOneProduct(productId);
    if (getProduct != null) {
        const cartData = {
            buyerId: req.user.id,
            sellerId: getProduct.sellerId,
            productId: getProduct.id,
            price: getProduct.price,
            quantity: quantities,
            total: getProduct.price * quantities
        }
        const data = await cartService.addToCart(cartData);
        res.status(200).json(data);
    } else {
        res.status(403).json({
            message: "Product Not in List"
        })
    }
};

//  update to cart
exports.updateToCart = async (req, res) => {
    const data = await cartService.updateToCart(parseInt(req.query.productId), parseInt(req.query.quantity));
    res.status(200).json(data);
};

//  delete to cart
exports.deleteFromCart = async (req, res) => {
    await cartService.updateToCart(parseInt(req.query.cartId));
    res.status(403).json({
        message: "Deleted Item was "+req.query.cartId
    })
};
















// add Cart 
// exports.addCart = async (req, res) => {
//     try {
//         const { productId, quantities, deleteId } = req.query;
//         const buyer = {
//             buyerId: req.user.id,
//             productId: parseInt(productId)
//         }
//         const getProduct = await productService.getOneProduct(productId);
//         if (((productId && quantities) != 0) && (getProduct.stock >= quantities) || (deleteId)) {
//             const cartCheck = await productService.cartCheck(buyer);
//             if ((cartCheck != null) && (quantities != "0")) {
//                 console.log("1");
//                 const data = await cartService.updateCart(cartCheck.id, quantities);
//                 res.status(200).json(data);
//             } else if (deleteId != null) {
//                 console.log("2");
//                 const data = await cartService.deleteCart(parseInt(deleteId));
//                 res.status(200).json(data);
//             } else if (productId != null) {
//                 console.log("3");
//                 const getProduct = await productService.getOneProduct(productId);
//                 const cartData = {
//                     buyerId: req.user.id,
//                     sellerId: getProduct.sellerId,
//                     productId: getProduct.id,
//                     price: getProduct.price,
//                     quantity: quantities,
//                     total: getProduct.price * quantities
//                 }
//                 const data = await cartService.addCart(cartData);
//                 res.status(200).json(data);
//             }
//         } else {
//             res.status(200).json({
//                 message: "Enter Valid ValueF"
//             })
//         }

//     } catch (error) {
//         res.status(403).json({
//             message: error + 'Server error occurred'
//         })
//     }
// };

// // delete cart
// exports.deleteCart = async (req, res) => {
//     const { id } = req.body;
//     const cart = await cartService.deleteCart(id);
//     res.send("deleted is was = " + id);
// };

// Search cart
exports.cartHistory = async (req, res) => {
    try {
        const result = await cartService.getCartHistory(req, res);
        if (result) {
            res.status(200).json({
                message: result.cartsHistory,
                count: result.count
            })
        }
    } catch (err) {
        console.log("ERROR", err)
        res.status(403).json({
            message: 'Server error occurred'
        })
    }
}

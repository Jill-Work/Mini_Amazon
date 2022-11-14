const cartService = require("./cartService");


// get cart
exports.getCart = async (req,res) => { 
    const {id} = req.query;
    const cart = await cartService.getCart(id);
    console.log(cart);
    res.send(cart); 
};

exports.addCart = async (item, id) => {
    let cartItem = this.items[id];
    if (!cartItem) {
        cartItem = this.items[id] = {item: item, quantity: 0, price: 0};
    }
    cartItem.quantity++;
    cartItem.price = cartItem.item.price * cartItem.quantity;
    this.totalItems++;
    this.totalPrice += cartItem.item.price;
};

// delete cart
exports.deleteCart = async (req,res) => { 
    const {id} = req.body;
    const cart = await cartService.deleteCart(id);
    res.send("deleted is was = " + id);
};

// Search cart
exports.cartHistory = async (req, res) => {
    try {
        const result = await cartService.getCartHistory(req, res);
        if(result){
            res.status(200).json({
                message: result.cartsHistory,
                count: result.count
            })   
        } 
    } catch (err) {
        console.log("ERRROR", err)
        res.status(403).json({
            message: 'Server error occured'
        })
    }
}

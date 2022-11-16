const express = require('express');
const router = express.Router();
const cartController = require("../carts/cartController");
const usersMiddleware = require("../middleware/usersMiddleware");

router.get("/getCart", usersMiddleware.userAuth, cartController.getCartAllProduct);

router.post("/addToCart", usersMiddleware.userAuth, cartController.addToCart);

router.put("/updateToCart", usersMiddleware.userAuth, cartController.updateToCart)

router.delete("/deleteFromCart", usersMiddleware.userAuth, cartController.deleteFromCart);

module.exports = router;
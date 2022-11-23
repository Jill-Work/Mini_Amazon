const express = require('express');
const router = express.Router();
const cartController = require("../carts/cartController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/getCart", authMiddleware.authOfUsers, cartController.getCartAllProduct);

router.put("/addAndUpdateToCart", authMiddleware.authOfUsers, cartController.addAndUpdateToCart);

router.delete("/deleteFromCart", authMiddleware.authOfUsers, cartController.deleteFromCart);

module.exports = router;
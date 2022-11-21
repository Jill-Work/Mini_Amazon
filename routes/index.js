const express = require('express');
const router = express.Router();
const users = require("../users/users");
const product = require("../products/product");
const cart = require("../carts/cart");
const order = require("../orders/order")

// Routes
router.use("/users", users);

router.use("/product", product);

router.use("/cart", cart);

router.use("/order", order);


module.exports = router;



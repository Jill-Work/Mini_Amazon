const express = require('express');
const router = express.Router();
const users = require("../users/users");
const product = require("../products/product");
const cart = require("../carts/cart");

// Routes
router.use("/users", users);
router.use("/product", product);
router.use("/cart", cart);
module.exports=router;



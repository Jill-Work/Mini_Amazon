const express = require('express');
const router = express.Router();

//      require files
const users = require("../users/users");
const product = require("../products/product");
const cart = require("../carts/cart");


router.use("/users", users);
router.use("/product", product);
router.use("/cart", cart);
module.exports=router;



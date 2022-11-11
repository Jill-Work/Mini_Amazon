const express = require('express');
const router = express.Router();
const users = require("../users/users");
const product = require("../products/product");

// Routes
router.use("/users", users);
router.use("/product", product);

module.exports=router;



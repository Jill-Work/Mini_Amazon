const express = require('express');
const router = express.Router();

//      require files
const users = require("../users/users")
const buyer = require("../buyer/buyer");
const seller = require("../seller/seller");
const product = require("../products/product");


router.use("/users",users);


router.use("/product", product);

module.exports=router;



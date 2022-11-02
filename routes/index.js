const express = require('express');
const router = express.Router();

//      require files
const buyer = require("../buyer/buyer");
const seller = require("../seller/seller");
const product = require("../products/product");

// router.use("/",buyer);

router.use("/buyer",buyer);

router.use("/seller",seller);

router.use("/product", product);

module.exports=router;



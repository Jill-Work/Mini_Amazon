const express = require('express');
const router = express.Router();

//      require files
const buyer = require("./buyer/buyer");
const seller = require("./seller/seller")

// router.use("/",buyer);

router.use("/buyer",buyer);

router.use("/seller",seller);

module.exports=router;



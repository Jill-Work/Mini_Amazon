const express = require('express');
const router = express.Router();
const cartController = require("../carts/cartController")

router.get("/", cartController.getCart);

router.post("/", cartController.addCart);

// router.delete("/delete", cartController.removeCart);

module.exports=router;
const express = require('express');
const router = express.Router();
const productController = require("../products/productController")
const productMiddleware = require("../middleware/productMiddleware");

router.get("/", productController.getProduct);

router.post("/", productMiddleware.insertProduct, productController.addProduct);

router.put("/:id", productController.updateProduct);

router.delete("/delete", productController.deleteProduct);

router.get("/search", productController.productHistory);

module.exports=router;
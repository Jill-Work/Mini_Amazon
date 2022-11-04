const express = require('express');
const router = express.Router();
const productController = require("../products/productController")


router.get("/get/:id", productController.getProduct);

router.get("/gets", productController.getProducts);

router.post("/add", productController.addProduct);

router.put("/update/:id", productController.updateProduct);

router.delete("/delete/:id", productController.deleteProduct);

module.exports=router;
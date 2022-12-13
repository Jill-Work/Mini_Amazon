const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const productController = require("../products/productController");
const productMiddleware = require("../middleware/productMiddleware");

router.get("/product", productController.getProduct);

router.post("/addProduct", authMiddleware.authOfUsers, productMiddleware.insertProduct, productController.addProduct);

router.put("/update/:id", productController.updateProduct);

router.delete("/delete", productController.deleteProduct);

router.get("/search", productController.productHistory);

module.exports = router;
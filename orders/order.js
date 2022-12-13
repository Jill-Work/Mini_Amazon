const express = require('express');
const router = express.Router();
const orderController = require("./orderController");
const authMiddleware = require("../middleware/authMiddleware");


router.get("/getOrder", authMiddleware.authOfUsers, orderController.getOrder);

router.post("/createOrder", authMiddleware.authOfUsers, orderController.createOrder);


module.exports = router;
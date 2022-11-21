const express = require('express');
const router = express.Router();
const orderController = require("./orderController");
const usersMiddleware = require("../middleware/usersMiddleware");


router.get("/getOrder", usersMiddleware.userAuth, orderController.getOrder);

router.post("/createOrder", usersMiddleware.userAuth, orderController.createOrder);


module.exports = router;
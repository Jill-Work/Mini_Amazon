const express = require('express');
const router = express.Router();
const buyerController = require("../buyer/buyerController")
const buyerMiddleware = require("../middleware/buyerMiddleware")


router.get("/get/:id", buyerController.getBuyer);

router.get("/gets", buyerController.getBuyers);

router.post("/signup", buyerMiddleware.insertBuyer, buyerController.signUp);

router.get("/login",(req,res) => { res.send ("all user") });

router.put("/update/:id", buyerController.updateBuyer);

router.delete("/delete/:id", buyerController.deleteBuyer);



module.exports = router;
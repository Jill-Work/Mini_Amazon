const express = require('express');
const router = express.Router();
const buyerController = require("../buyer/buyerController")


router.get("/get/:id", buyerController.getBuyer);

router.get("/gets", buyerController.getBuyers);

router.post("/add", buyerController.addBuyer);

router.put("/update/:id", buyerController.updateBuyer);

router.delete("/delete/:id", buyerController.deleteBuyer);

//      log in or token generator
// router.get("/all",(req,res) => { res.send ("all user") });

// router.get("/all",(req,res) => { res.send ("all user") });


module.exports=router;
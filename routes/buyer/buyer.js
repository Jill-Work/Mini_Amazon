const express = require('express');
const router = express.Router();
const buyerController = require("../../controller/buyer/buyerController")


router.get("/get", buyerController.getBuyer);

router.get("/gets", buyerController.getBuyers);

router.post("/post", buyerController.addBuyer);

router.put("/put", buyerController.updateBuyer);

router.delete("/delete", buyerController.deleteBuyer);

//      log in or token generator
// router.get("/all",(req,res) => { res.send ("all user") });

// router.get("/all",(req,res) => { res.send ("all user") });


module.exports=router;
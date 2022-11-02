const express = require('express');
const router = express.Router();
const sellerController = require("../seller/sellerController")


router.get("/get/:id",sellerController.getSeller);

router.get("/gets",sellerController.getSellers);

router.post("/add",sellerController.addSeller);

router.put("/update/:id",sellerController.updateSeller);

router.delete("/delete/:id",sellerController.deleteSeller);

//      log in or token generator
// router.get("/all",(req,res) => { res.send ("all user") });

// router.get("/all",(req,res) => { res.send ("all user") });


module.exports=router;
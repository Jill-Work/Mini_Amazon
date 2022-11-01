const express = require('express');
const router = express.Router();
const sellerController = require("../../controller/seller/sellerController")


router.get("/get",sellerController.getSeller);

router.get("/gets",sellerController.getSellers);

router.post("/post",sellerController.addSeller);

router.put("/put",sellerController.updateSeller);

router.delete("/delete",sellerController.deleteSeller);

//      log in or token generator
// router.get("/all",(req,res) => { res.send ("all user") });

// router.get("/all",(req,res) => { res.send ("all user") });


module.exports=router;
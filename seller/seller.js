const express = require('express');
const router = express.Router();
const sellerController = require("../seller/sellerController")
const sellerMiddleware = require("../middleware/sellerMiddleware")


router.get("/get/:id",sellerController.getSeller);

router.get("/gets",sellerController.getSellers);

router.post("/signup", sellerMiddleware.insertSeller, sellerController.signUp);

router.get("/login",(req,res) => { res.send ("all user") });

router.put("/update/:id",sellerController.updateSeller);

router.delete("/delete/:id",sellerController.deleteSeller);



module.exports=router;
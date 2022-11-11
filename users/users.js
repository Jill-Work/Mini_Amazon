const express = require('express');
const router = express.Router();
const usersController = require("../users/usersController");
const usersMiddleware = require("../middleware/usersMiddleware");


router.get("/get",  usersMiddleware.userAuth, usersController.getUser);

router.get("/gets", usersMiddleware.userAuth , usersController.getUsers);

router.post("/signup", usersMiddleware.insertUsers , usersController.signUp);

router.get("/login", usersMiddleware.logIn , usersController.logIn );

router.put("/update", usersMiddleware.updateUser , usersMiddleware.userAuth , usersController.updateUsers);

router.put("/changePassword", usersMiddleware.userAuth, usersController.changePassword);

router.delete("/delete", usersMiddleware.userAuth,  usersController.deleteUsers);

router.post("/adminSignup", usersMiddleware.insertUsers , usersController.admin);

router.post("/test", async (req,res)=>{
    res.send("test api")
})  
 

module.exports=router;
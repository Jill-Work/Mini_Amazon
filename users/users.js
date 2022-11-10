const express = require('express');
const router = express.Router();
const usersController = require("../users/usersController");
const usersMiddleware = require("../middleware/usersMiddleware");


router.get("/get",  usersMiddleware.userAuth, usersController.getUser);

router.get("/gets", usersMiddleware.userAuth , usersController.getUsers);

router.post("/signup", usersMiddleware.insertusers , usersController.signUp);

router.get("/login", usersMiddleware.logIn , usersController.logIn );

router.put("/update", usersMiddleware.updateUser , usersMiddleware.userAuth , usersController.updateUsers);

router.put("/changepassword", usersMiddleware.userAuth, usersController.changePassword);

router.delete("/delete", usersMiddleware.userAuth,  usersController.deleteUsers);

router.post("/adminsignup", usersMiddleware.insertusers , usersController.admin);

router.post("/test", async (req,res)=>{
    res.send("test api")
})  
 

module.exports=router;
const express = require('express');
const router = express.Router();
const usersController = require("../users/usersController");
const usersMiddleware = require("../middleware/usersMiddleware");
var string = require("string-sanitizer");


router.get("/gets", usersMiddleware.userAuth , usersController.getUsers);

router.post("/signup", usersMiddleware.insertusers , usersController.signUp);

router.get("/login",  usersController.logIn );

router.put("/update", usersMiddleware.userAuth, usersController.updateUsers);

router.delete("/delete", usersMiddleware.userAuth,  usersController.deleteUsers);

router.post("/adminsignup", usersMiddleware.userAuth, usersController.admin);

router.post("/test",(req,res)=>{
    let someString = req.body.helpo;
    console.log(someString);
        const a = string.sanitize(someString); // abcdefgh    
     console.log(a);
    
})
 

module.exports=router;
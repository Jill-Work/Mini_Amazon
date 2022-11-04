const express = require('express');
const 
router = express.Router();
const usersController = require("../users/usersController")
const usersMiddleware = require("../middleware/usersMiddleware")

router.get("/get", usersMiddleware.userAuth, usersController.getUser);

router.get("/gets", usersController.getUsers);

router.post("/signup", usersMiddleware.insertusers , usersController.signUp);

router.get("/login", usersController.logIn );

router.put("/update", usersMiddleware.userAuth, usersController.updateUsers);

router.delete("/delete", usersMiddleware.userAuth,  usersController.deleteUsers);



module.exports = router;
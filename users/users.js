const express = require('express');
const router = express.Router();
const usersController = require("../users/usersController");
const authMiddleware = require("../middleware/authMiddleware");
const validator = require("../requests/indexOfRequest");


router.get("/user/:id", authMiddleware.authOfUsers, usersController.userDetails);

router.get("/list", authMiddleware.authOfUsers, usersController.userList);

router.post("/signup", validator.userSignUpValidation, usersController.userSignUp);

router.get("/login", validator.checkLoginParameter, usersController.userLogIn);

router.put("/update", [validator.updateUserValidation, authMiddleware.authOfUsers], usersController.userUpdate);

router.put("/changePassword", authMiddleware.authOfUsers, usersController.userPasswordChange);

router.delete("/:id", authMiddleware.authOfUsers, usersController.userDelete);


router.post("/adminSignup", validator.userSignUpValidation, usersController.admin);

router.get("/listOfPermission", authMiddleware.authOfUsers ,usersController.listOfRoute);

router.post("/addPermission", authMiddleware.authOfUsers , usersController.addRoute);

router.put("/updatePermission", authMiddleware.authOfUsers);

router.delete("/deletePermission", authMiddleware.authOfUsers);



router.get("/test", usersController.test);


module.exports = router;
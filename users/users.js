const express = require('express');
const router = express.Router();
const usersController = require("../users/usersController");
const usersMiddleware = require("../middleware/usersMiddleware");
const insertUsers = require("../requests/insertUserRequest");
const logIn = require("../requests/logInRequest");
const update = require("../requests/updateRequest")

// usersMiddleware.userAuth,
router.get("/user/:id",  usersController.getUser);

router.get("/list", usersMiddleware.userAuth, usersController.getUsers);

router.post("/signup", insertUsers.insertUsers, usersController.signUp);

router.get("/login", logIn.logIn, usersController.logIn);

router.put("/update", update.updateUser, usersMiddleware.userAuth, usersController.updateUsers);

router.put("/changePassword", usersMiddleware.userAuth, usersController.changePassword);

router.delete("/:id", usersMiddleware.userAuth, usersController.deleteUsers);

router.post("/adminSignup", insertUsers.insertUsers, usersController.admin);


module.exports = router;
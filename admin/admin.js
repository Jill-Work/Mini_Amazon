const express = require('express');
const 
router = express.Router();
const adminController = require("../admin/adminController")
const adminMiddleware = require("../middleware/usersMiddleware")

router.get("/get", adminMiddleware.userAuth, adminController.getaAdmin);

router.get("/gets", adminController.getAdmin);

router.post("/signup", adminMiddleware.insertAdmin , adminController.signUp);

router.get("/login", adminController.logIn );

router.put("/update", adminMiddleware.userAuth, adminController.updateAdmin);

router.delete("/delete", adminMiddleware.userAuth,  adminController.deleteAdmin);



module.exports = router;
const express = require('express');
const router = express.Router();

//      require files
const users = require("../users/users")


router.use("/users",users);


module.exports=router;



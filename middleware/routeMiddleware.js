const express = require('express');
const app = express();
const { where } = require('sequelize');
const model = require("../models/db");
const um = require("./usersMiddleware")

exports.routhauth = async (req,res,next) => {
    const routes = req.path;
    const checkT = um.userAuth.req;
    // const role = req;
    console.log("role",checkT);
    console.log(routes);
    const path = await model.routeauth.findOne(
        {where:{routes}}
    )
    // const checkPath = path.dataValues.role


    



};
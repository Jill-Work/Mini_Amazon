const usersService = require("./usersServices");
const model = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require("../.env");
const role = require("../models/role");
const { tokenJwt, addUser } = require("../comman/helper");



// get users
exports.getUser = async (req, res) => {
    const email = req.query.email;
    const users = await usersService.getUser(email)
    res.send(users);
    console.log("getUser in controller",users.dataValues);
};


// get users
exports.getUsers = async (req, res) => {
    console.log("hello  =       = = =      ");
    let condition = {};

    if (req.query.search) {
        condition = {
            where: { "email": req.query.search }
        }
    } else {
        condition = {
            limit: parseInt(req.query.size),
            offset: parseInt(req.query.size) * parseInt((req.query.page - 1)),
        }
    }

    const users = await usersService.getUsers(condition);
    res.status(200).json( users );
    console.log("Get users in controller", users);
};

//  Sign Up
exports.signUp = async (req, res) => {
    const values = ['BUYER','SELLER']
    await addUser (req,res,values)
};


// log in
exports.logIn = async (req, res) => {
    const bodydata = req.body;
    const bodyRole = bodydata.role;
    const password = bodydata.password;
    const email = bodydata.email
    const users = await usersService.getUser(email);
    console.log("user in log in ",users);
    const userPass = users.password;
    bcrypt.compare(password, userPass, (err, data) => {
        
        if (err) throw err

        if (data) {
            const token = tokenJwt(users);
            console.log("token   ==>.  " + token);
            res.status(200).json({ token });
        } else {
            res.status(404).json({ error : "invalid details"});
            console.log("invalid details in student controller");
        }
    })
};


// update users
exports.updateUsers = async (req, res) => {
    const email = req.user.email
    const dbEmail = await usersService.getUser(email);
    console.log("dbemail",email)
    let update = {};
    if((req.body.hasOwnProperty("first_name"))||(req.body.hasOwnProperty("last_name"))){
        if (req.body.first_name != dbEmail.dataValues.first_name) {
            update.first_name = req.body.first_name;
        }else{
            update.first_name = dbEmail.dataValues.first_name;
        }
        if (req.body.last_name != dbEmail.dataValues.last_name) {
            update.last_name = req.body.last_name;
        }else{
            update.last_name = dbEmail.dataValues.last_name;
        }
    }
    if((req.body.hasOwnProperty("contact_num"))&&(req.body.hasOwnProperty("email"))){
        const oldNumber = await usersService.profile(req.body.contact_num);
        const oldEmail = await usersService.getUser(req.body.email);
        console.log("old    = ",oldEmail.dataValues.email);
        if(oldNumber.length == 0){
            update.contact_num = req.body.contact_num;
        }else{
            update.contact_num = oldEmail.dataValues.contact_num ;
        }
        if(oldEmail == null){
            update.email = req.body.email;
        }else{
            update.email = oldEmail.dataValues.email;
        }
    };
    await usersService.updateUsers( dbEmail.dataValues.email , update );
    res.status(200).json( update );
};

// change password
exports.changePassword = async (req, res) => {
    const email = req.user.email;
    const oldPassword = req.body.password;
    const newPassword = req.body.new_password;
    const conPassword = req.body.confirm_password;
    const update = {};
    if(newPassword === conPassword){
        
        const user = await usersService.getUser(email);
        
        bcrypt.compare(oldPassword , user.password , async (err ,data) => {
        if(err) throw err ;
            
        if(data){
            console.log("hello");
            const salt = await bcrypt.genSalt(10);
            update.password = await bcrypt.hash(newPassword, salt);
            await usersService.updateUsers( email , update );
            res.status(200).json( {massage : "Your password is updated successfully" });
            console.log("Your password is updated successfully in controller");
        }else{
            res.status(400).json( {massage : "Your password is incorrect" });
            console.log("Your password is incorrect");
        }
    })

    } else{
        console.log("password didn't match");
    };

};

// delete users
exports.deleteUsers = async (req, res) => {
    const email = req.query.email;
    const users = await usersService.deleteUsers(email);
    res.status(200).json({"Deleted is was":email});
    console.log("deleted users id is in users controller  ==>>  " + email);
};


// add admin
exports.admin = async (req,res) => {
    const values = ['ADMIN']
    await addUser(req,res,values);
};









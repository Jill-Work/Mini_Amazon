const usersService = require("./usersServices");
const model = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require("../.env");
const role = require("../models/role");

// get users
exports.getUsers = async (req, res) => {
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
    const password = bodydata.password;
    const user = await usersService.getUser(bodydata.email);
    const userPass = user.password;
    bcrypt.compare(password, userPass, (err, data) => {
        
        if (err) throw err

        if (data) {
            const token = jwt.sign({ "email": user }, SECRET_KEY);
            console.log("token   ==>.  " + token);
            res.status(200).json({ token });
            console.log("log in in user controller  ==>>  " + JSON.stringify(user));

        } else {
            res.status(404).json({ error : "invalid details"});
            console.log("invalid details in student controller");
        }
    })
};


// update users
exports.updateUsers = async (req, res) => {
    const email = req.query.email;
    const update = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        contact_num: req.body.contact_num,
        password: req.body.password,
    }
    const users = await usersService.updateUsers(email, update);
    res.status(200).json({ ...users, update });
    console.log("update in users controller", users, update);
};

// delete users
exports.deleteUsers = async (req, res) => {
    const email = req.query.email;
    const users = await usersService.deleteUsers(email);
    res.status(200).json({"Deleted is was":email});
    console.log("deleted users id is in users controller  ==>>  " + email);
};

exports.admin = async (req,res) => {
    const values = ['ADMIN']
    await addUser(req,res,values)
};

//  Add User Function
async function addUser(req,res,values) {    
    const data = req.body;
    const match = values.find(element => element == data.role);
    const oldusers = await usersService.getUser(data.email);

    if ((!oldusers)&&(data.role === match)) {
        
        var password = data.password;
        const token = jwt.sign({ "email": data }, SECRET_KEY);
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        
        if (data.password === data.conpassword) {
            data.password = password;
            const users = await usersService.addUsers(data);
            const usersData = { ...users.dataValues, token };
            res.status(200).json(usersData);
            console.log("create users is in users controller  ==>>  " + JSON.stringify(usersData));
        } else {
            res.status(401).json({massage:"Invalid Confirm Password"});
            console.log("invalid confirm password in users controller");
        }
    }

    else {
        res.status(401).json({massage:"users Already exits"});
        console.log("users Already exits");
    }

};

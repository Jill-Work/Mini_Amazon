const adminService = require("./adminervices");
const model = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require("../.env");

// get admin
exports.getAdmin = async (req, res) => {
    const email = req.query.email;
    const admin = await adminService.getAdmin(email)
    res.send(admin);
    console.log("admin in controller", admin.dataValues);

};

// get admins
exports.getAdmin = async (req, res) => {
    const admin = await adminService.getAdmin();
    res.send(admin);
    console.log("admin in controller", admin);
};

//  Sign Up
exports.signUp = async (req, res) => {
    const data = req.body;
    const oldadmin = await adminService.getAdmin(data.email);

    if (!oldadmin) {

        var password = data.password;
        const token = jwt.sign({ "email": data }, SECRET_KEY);
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        if (data.password === data.conpassword) {
            data.password = password;
            const admin = await adminService.addAdmin(data);
            const adminData = { ...admin.dataValues, token }
            res.send(adminData)
            console.log("create admin is in admin controller  ==>>  " + JSON.stringify(adminData));
        } else {
            res.send("invalid confirm password");
            console.log("invalid confirm password in admin controller");
        }
    }

    else {
        console.log("admin Already exits");
        res.send("admin Already exits");
    }
};


// log in
exports.logIn = async (req, res) => {
    const bodydata = req.body;
    const password = bodydata.password;
    const admin = await adminService.getAdmin(bodydata.email);
    const adminPass = admin.password;
    bcrypt.compare(password, adminPass, (err, data) => {
        
        if (err) throw err

        if (data) {
            const token = jwt.sign({ "email": admin }, SECRET_KEY);
            console.log("token   ==>.  " + token);
            res.status(200).json({ token });
            // res.send(admin);
            console.log("log in in admin controller  ==>>  " + JSON.stringify(admin));

        } else {
            res.send("invalid details");
            console.log("invalid details in student controller");
        }
    })
}


// update admin
exports.updateAdmin = async (req, res) => {
    const email = req.query.email;
    const update = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        contact_num: req.body.contact_num,
        password: req.body.password,
    }
    const admin = await adminService.updateAdmin(email, update);
    res.send({ ...admin, update });
    console.log("update in admin controller", admin, update);
};

// delete admin
exports.deleteAdmin = async (req, res) => {
    const email = req.query.email;
    const admin = await adminService.deleteAdmin(email);
    res.send("deleted is was = " + email);
    console.log("deleted admin id is in admin controller  ==>>  " + email);
};
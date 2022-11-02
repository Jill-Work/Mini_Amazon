const buyerService = require("./buyerService");
const model = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require("../.env");

// get buyer
exports.getBuyer = async (req, res) => {
    const email = req.params.email;
    console.log("email in buyer controller ", email)

    const buyer = await buyerService.getBuyer(email);
    res.send(buyer);
};

// get buyer
exports.getBuyers = async (req, res) => {
    const buyers = await buyerService.getBuyers();
    res.send(buyers);
    console.log("user in controller", buyers);
};

//  Sign Up
exports.signUp = async (req, res) => {
    const data = req.body;
    const oldBuyer = await buyerService.getBuyer(data.email);

    if (!oldBuyer) {
        var password = data.password;
        const token = jwt.sign({ "email": data }, SECRET_KEY);
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        
        if (data.password === data.conpassword) {
            data.password = password;
            const buyer = await buyerService.addBuyer(data);
            const buyerData = {...buyer.dataValues,token}
            res.send(buyerData);
            console.log("create buyer is in buyer controller  ==>>  " + JSON.stringify(buyerData));
        } else {
            res.send("invalid confirm password");
            console.log("invalid confirm password in buyer controller");
        }
    } else {
        console.log("Buyer Already exits");
        res.send("Buyer Already exits");
    }

};

// Log In

// update buyer
exports.updateBuyer = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const update = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
    }
    console.log("update in buyer controller", update);
    const buyer = await buyerService.updateBuyer(id, update);
    res.send(buyer);
};

// delete buyer
exports.deleteBuyer = async (req, res) => {
    const id = req.params.id;
    const buyer = await buyerService.deleteBuyer(id);
    res.send("deleted is was = " + id);
    console.log("deleted buyer id is in buyer controller  ==>>  " + id);
};


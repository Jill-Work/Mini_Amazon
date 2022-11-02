const sellerService = require("./sellerService");
const model = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require("../.env");

// get seller
exports.getSeller = async (req,res) => { 
    const id = req.params.id;
    console.log("id in seller controller ", id)

    const buyer = await sellerService.getSeller(id)
    res.send(buyer);
    console.log("buyer in seller controller",buyer);
};

// get sellers
exports.getSellers = async (req,res) => { 
    const buyers = await sellerService.getSellers();
    res.send(buyers);
    console.log("seller in controller",buyers);
 };

//  Sign Up
exports.signUp = async (req, res) => {
    const data = req.body;
    const oldBuyer = await sellerService.getSeller(data.email);

    if (!oldBuyer) {
        var password = data.password;
        const token = jwt.sign({ "email": data }, SECRET_KEY);
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        if (data.password === data.conpassword) {
            data.password = password;
            const seller = await sellerService.addSeller(data);
            const sellerData = {...seller.dataValues,token}
            res.send(sellerData)
            console.log("create seller is in seller controller  ==>>  " + JSON.stringify(sellerData));
        } else {
            res.send("invalid confirm password");
            console.log("invalid confirm password in seller controller");
        }
    } else {
        console.log("Seller Already exits");
        res.send("Seller Already exits");
    }

};


// update seller
exports.updateSeller = async (req,res) => { 
    const id = req.params.id;
    const update = {
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
    }
    const buyer = await sellerService.updateSeller(id,update);
    res.send(buyer);
 };

// delete seller
exports.deleteSeller = async (req,res) => { 
    const id = req.params.id;
    const seller = await sellerService.deleteSeller(id);
    res.send("deleted is was = " + id);
    console.log("deleted seller id is in seller controller  ==>>  " + id);
 };
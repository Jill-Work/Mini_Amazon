const sellerService = require("./sellerService");
const model = require('../models/db');
const bcrypt = require('bcrypt');

// get student
exports.getSeller = async (req,res) => { 
    const id = req.params.id;
    console.log("id in seller controller ", id)

    const buyer = await sellerService.getSeller(id)
    res.send(buyer);
    console.log("buyer in seller controller",buyer);
};

// get students
exports.getSellers = async (req,res) => { 
    const buyers = await sellerService.getSellers();
    res.send(buyers);
    console.log("seller in controller",buyers);
 };

// insert student
exports.addSeller = async (req,res) => { 
    const data = req.body;
    var password = data.password;

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt)

    if (data.password === data.conpassword) {
        data.password = password;

        const buyer = await sellerService.addSeller(data);
        res.send(buyer)
        console.log("create buyer is in buyer controller  ==>>  "+JSON.stringify(buyer));
    } else {
        res.send("invalid confirm password");
        console.log("invalid confirm password in student controller");
    } 
 };

// update student
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

// delete student
exports.deleteSeller = async (req,res) => { 
    const id = req.params.id;
    const seller = await sellerService.deleteSeller(id);
    res.send("deleted is was = " + id);
    console.log("deleted seller id is in seller controller  ==>>  " + id);
 };
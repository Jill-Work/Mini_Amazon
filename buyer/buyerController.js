const buyerService = require("./buyerService");
const model = require('../models/db');
const bcrypt = require('bcrypt');

// get student
exports.getBuyer = async (req,res) => { 
    const id = req.params.id;
    console.log("id in buyer controller ", id)

    const buyer = await buyerService.getBuyer(id);
    res.send(buyer);
};

// get students
exports.getBuyers = async (req,res) => { 
    const buyers = await buyerService.getBuyers();
    res.send(buyers);
    console.log("user in controller",buyers);
 };

// insert student
exports.addBuyer = async (req,res) => { 
    const data = req.body;
    var password = data.password;

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    if (data.password === data.conpassword) {
        data.password = password;

        const buyer = await buyerService.addBuyer(data);
        res.send(buyer)
        console.log("create buyer is in buyer controller  ==>>  "+JSON.stringify(buyer));
    } else {
        res.send("invalid confirm password");
        console.log("invalid confirm password in student controller");
    } 
 };

// update student
exports.updateBuyer = async (req,res) => { 
    const id = req.params.id;
    console.log(id);
    const update = {
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
    }
    console.log("update in buyer controller",update);
    const buyer = await buyerService.updateBuyer(id,update);
    res.send(buyer);
 };

// delete student
exports.deleteBuyer = async (req,res) => { 
    const id = req.params.id;
    const buyer = await buyerService.deleteBuyer(id);
    res.send("deleted is was = " + id);
    console.log("deleted buyer id is in buyer controller  ==>>  " + id);
};

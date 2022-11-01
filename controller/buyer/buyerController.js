const buyerService = require("../../service/buyerService.js");
const model = require('../../models/db');

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
    console.log("buyer data in buyer controller",data);

    const buyer = await buyerService.addBuyer(data);
    res.send(buyer)
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

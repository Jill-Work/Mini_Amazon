const sellerService = require("../../service/sellerService.js");
const model = require('../../models/db');


exports.getSeller = async (req,res) => { 
    const id = req.params.id;
    console.log("id in seller controller ", id)

    const buyer = await sellerService.getSeller(id)
    res.send(buyer);
    console.log("buyer in seller controller",buyer);
};

exports.getSellers = async (req,res) => { 
    const buyers = await sellerService.getSellers();
    res.send(buyers);
    console.log("seller in controller",buyers);
 };

exports.addSeller = async (req,res) => { 
    const data = req.body;
    console.log("seller data in buyer controller",data);

    const buyer = await sellerService.addSeller(data);
    res.send(buyer)
 };

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

exports.deleteSeller = async (req,res) => { 
    const id = req.params.id;
    const seller = await sellerService.deleteSeller(id);
    res.send("deleted is was = " + id);
    console.log("deleted seller id is in seller controller  ==>>  " + id);
 };
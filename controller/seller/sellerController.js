const sellerService = require("../../service/buyerService.js");
const model = require('../../models/db');


exports.getSeller = async (req,res) => { res.send ("single user") };

exports.getSellers = async (req,res) => { res.send ("all user") };

exports.addSeller = async (req,res) => { res.send ("add user") };

exports.updateSeller = async (req,res) => { res.send ("edit user") };

exports.deleteSeller = async (req,res) => { res.send ("delete user") };
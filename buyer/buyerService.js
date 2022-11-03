const { where } = require('sequelize');
const model = require("../models/db");

// get buyer
exports.getBuyer = async (email) => {
    return await model.buyer.findOne({
        where:{email}
    })
};


// get buyers
exports.getBuyers = async () => {
    return await model.buyer.findAll({})
};


// add buyer by admin
exports.addBuyer = async (data) => {
    return await model.buyer.create(data);
};


// update buyer
exports.updateBuyer = async (id,update) => {
    return await model.buyer.update(update,{where:{id}});
};


// delete buyer
exports.deleteBuyer = async (id) => {
    return await model.buyer.destroy({where:{id}});
};

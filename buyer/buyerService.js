const { where } = require('sequelize');
const model = require("../models/db");


// get student
exports.getBuyer = async (id) => {
    return await model.buyer.findOne({
        where:{id}
    })
};


// get students
exports.getBuyers = async () => {
    return await model.buyer.findAll({})
};


// insert student
exports.addBuyer = async (data) => {
    return await model.buyer.create(data);
};


// update student
exports.updateBuyer = async (id,update) => {
    return await model.buyer.update(update,{where:{id}});
};


// delete student
exports.deleteBuyer = async (id) => {
    return await model.buyer.destroy({where:{id}});
};

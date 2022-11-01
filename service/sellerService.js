const { where } = require('sequelize');
const model = require("../models/db");

// get student
exports.getSeller = async (id) => {
    return await model.seller.findOne({
        where:{id}
    })
};


// get students
exports.getSellers = async () => {
    return await model.seller.findAll({})
};


// insert student
exports.addSeller = async (data) => {
    return await model.seller.create(data);
};


// update student
exports.updateSeller = async (id,update) => {
    return await model.seller.update(update,{where:{id}});
};


// delete student
exports.deleteSeller = async (id) => {
    return await model.seller.destroy({where:{id}});
};

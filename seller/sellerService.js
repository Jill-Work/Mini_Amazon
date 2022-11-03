const { where } = require('sequelize');
const model = require("../models/db");

// get seller
exports.getSeller = async (id) => {
    return await model.seller.findOne({
        where:{id}
    })
};


// get sellers
exports.getSellers = async () => {
    return await model.seller.findAll({})
};


// insert seller
exports.addSeller = async (data) => {
    return await model.seller.create(data);
};


// update seller
exports.updateSeller = async (id,update) => {
    return await model.seller.update(update,{where:{id}});
};


// delete seller
exports.deleteSeller = async (id) => {
    return await model.seller.destroy({where:{id}});
};

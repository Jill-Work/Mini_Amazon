const { where } = require('sequelize');
const model = require("../models/db");

// get admin
exports.getadmin = async (email) => {
    // console.log("role == ",role);
    return await model.admin.findOne({
        where:{email}
    })
};


// get admin
exports.getadmin = async () => {
    return await model.admin.findAll({})
};


// sign up admin
exports.addadmin = async (data) => {
    return await model.admin.create(data);
};


// log in admin
exports.signUp = async (email) => {
    return await model.admin.findOne({where:{email}})
}

// update admin
exports.updateadmin = async (email,update) => {
    return await model.admin.update(update,{where:{email}});
};


// delete admin
exports.deleteadmin = async (email) => {
    return await model.admin.destroy({where:{email}});
};

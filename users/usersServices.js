const { where , Op } = require('sequelize');
const model = require("../models/db");


//get user
exports.getUser = async (email) => {
    await model.users.findOne({where:{email}});
    return;
}

//get profile
exports.profile = async (contactNumber) => {
    return await model.users.findAll({ 
        where : {
            [Op.or]:[
                {contactNumber}
            ]} 
        })
};

// get users
exports.getUsers = async (condition) => {
    return await model.users.findAll(condition)
};


// sign up users
exports.addUsers = async (data) => {
    return await model.users.create(data);
};


// log in user
exports.signUp = async (email) => {
    return await model.users.findOne({where:{email}})
};

// update users
exports.updateUsers = async (email,update) => {
    return await model.users.update(update,{where:{email}});
};


// delete users
exports.deleteUsers = async (email) => {
    return await model.users.destroy({where:{email}});
};

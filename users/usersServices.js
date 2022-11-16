const { where } = require('sequelize');
const model = require("../models/db");


//get user
exports.getUser = async (email) => {
    const data = await model.users.findOne({where: {email} });
    return nullCheck(data);
    
}

//get getContactNumber
exports.getContactNumber = async (contactNumber) => {
    return await model.users.findAll({ where : {contactNumber} });
    
};

// get users
exports.getUsers = async (condition) => {
    return await model.users.findAll(condition);
};

// sign up users
exports.addUsers = async (data) => {
    const user = await model.users.create(data);
    return user.dataValues;
};

// update users
exports.updateUsers = async (email,update) => {
    const user = await model.users.update(update,{where:{email}});
    return user.dataValues;
};


// delete users
exports.deleteUsers = async (email) => {
    return await model.users.destroy({where:{email}});
};


// null check function
function nullCheck(data) {
    if (data == null) {
        return null;
    } else {
        return data.dataValues;
    }
}
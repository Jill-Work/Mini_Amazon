const model = require("../models/db");
const common = require("../common/common");


//get user
exports.getUser = async (condition) => {
    const data = await model.users.findOne(condition);
    return common.nullCheck(data);

};

// get users
exports.getUsers = async (condition) => {
    return await model.users.findAll(condition);
};

// sign up users
exports.addUsers = async (data) => {
    const { dataValues } = await model.users.create(data);
    return dataValues;
};

// update users
exports.updateUsers = async (email, update) => {
    const { dataValues } = await model.users.update(update, { where: { email } });
    return dataValues;
};


// delete users
exports.deleteUsers = async (email) => {
    return await model.users.destroy({ where: { email } });
};

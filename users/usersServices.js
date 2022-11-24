const model = require("../models/db");
const common = require("../common/indexOfCommon");


//get user
exports.getUserData = async (condition) => {
    const data = await model.users.findOne(condition);
    return common.nullCheck(data);
};

// get users
exports.getUsersList = async (condition) => {
    return await model.users.findAll(condition);
};

// sign up users
exports.creteUser = async (data) => {
    const { dataValues } = await model.users.create(data);
    return dataValues;
};

// update users
exports.updateUser = async (email, update) => {
    const { dataValues } = await model.users.update(update, { where: { email } });
    return dataValues;
};

// delete users
exports.deleteUser = async (email) => {
    return await model.users.destroy({ where: { email } });
};

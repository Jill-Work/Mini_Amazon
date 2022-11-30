const model = require("../models/db");
const common = require("../common/indexOfCommon");
const userCache = require("../requests/usersCacheRequest");


//get user
exports.getUserData = async (condition) => {
    const data = await model.users.findOne(condition);
    return common.nullCheckWithDataValues(data);
};

// get users
exports.getUsersList = async (condition) => {
    const data = await model.users.findAll(condition);
    return common.nullCheckWithOutDataValues(data);
};

// sign up users
exports.creteUser = async (data) => {
    const newUserData = await model.users.create(data);
    delete newUserData.dataValues.password;
    await userCache.setCacheData(`userCache${newUserData.dataValues.id}`, newUserData.dataValues);
    return common.nullCheckWithDataValues(newUserData);
};

// update users
exports.updateUser = async (id, update) => {
    await model.users.update(update, { where: { id } });
    const data = await model.users.findOne({ where: { id },attributes: { exclude: ['password'] }, });
    await userCache.setCacheData(`userCache${data.dataValues.id}`, data.dataValues);
    return common.nullCheckWithDataValues(data);
};

// delete users
exports.deleteUser = async (email) => {
    return await model.users.destroy({ where: { email } });
};



// list of permission route
exports.listOfRoute = async (operationsName, role) => {
    let condition = {};
    if (operationsName) {
        condition = { where: { operationsName } }
    };
    if (role) {
        condition = { where: { role } }
    };
    const listOfPermission = await model.permission.findAll(condition);
    return common.nullCheckWithOutDataValues(listOfPermission);
};

//find one route or permission name
exports.findOnePermission = async (condition) => {
    const data = await model.permission.findOne(condition);
    return common.nullCheckWithDataValues(data);
};

// add permission route
exports.addPermission = async ({ operationsName, role, routes }) => {
    const bodyData = { operationsName, role, routes };
    const data = await model.permission.create(bodyData);
    return common.nullCheckWithDataValues(data);
};

//delete permission route
exports.deletePermission = async (operationsName, role) => {
    return await model.users.destroy({ where: { operationsName, role } });
};
const usersService = require("../users/usersServices");
const common = require("../common/jwtCommon");
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const userCache = require("../requests/usersCacheRequest");

//  Add User or Admin Function 
exports.createNewUser = async (req, res, values) => {
    const bodyData = req.body;
    const matchRole = values.find(element => element == bodyData.role);
    if (!matchRole) {
        return res.status(400).json({ Message: "You are not authorize to this page" });
    }
    const existingUser = await usersService.getUserData({
        where: {
            [Op.or]: [
                { email: bodyData.email },
                { contactNumber: bodyData.contactNumber }
            ]
        }
    });
    if (!existingUser) {
        if (bodyData.password === bodyData.confirmPassword) {
            const salt = await bcrypt.genSalt(10);
            bodyData.password = await bcrypt.hash(bodyData.password, salt);
            const newUser = await usersService.creteUser(bodyData);
            delete newUser.password;
            const token = common.tokenJwt(newUser);
            const newUserDetail = { ...newUser, token };
            await userCache.setCacheData(newUser.id,newUserDetail);
            res.status(200).json(newUserDetail);
        } else {
            res.status(401).json({ Message: "Invalid Confirm Password" });
        }
    } else {
        res.status(401).json({ Message: "users Already exits" });
    }
    return;
};

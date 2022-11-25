const { updateUserValidation } = require("../requests/updateRequest");
const { userSignUpValidation } = require("./insertUserRequest");
const { checkLoginParameter } = require("./logInRequest");

module.exports = { userSignUpValidation, updateUserValidation, checkLoginParameter };
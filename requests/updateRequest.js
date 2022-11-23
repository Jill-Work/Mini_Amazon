const string = require("string-sanitizer");

exports.updateUser = (req, next) => {
    const bodyData = req.body;
    bodyData.firstName = string.sanitize.removeNumber(bodyData.firstName);
    bodyData.lastName = string.sanitize.removeNumber(bodyData.lastName);
    // bodyData.email = string.validate.isEmail(bodyData.email)     //email validation
    req.body.firstName = bodyData.firstName.charAt(0).toUpperCase() + bodyData.firstName.slice(1);
    req.body.lastName = bodyData.lastName.charAt(0).toUpperCase() + bodyData.lastName.slice(1);
    console.log("update middleware check is done");
    next();
};
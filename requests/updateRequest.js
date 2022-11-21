const string = require("string-sanitizer");

exports.updateUser = (req, res, next) => {
    const incomingData = req.body;
    incomingData.firstName = string.sanitize.removeNumber(incomingData.firstName);
    incomingData.lastName = string.sanitize.removeNumber(incomingData.lastName);
    // incomingData.email = string.validate.isEmail(incomingData.email)     //email validation
    req.body.firstName = incomingData.firstName.charAt(0).toUpperCase() + incomingData.firstName.slice(1);
    req.body.lastName = incomingData.lastName.charAt(0).toUpperCase() + incomingData.lastName.slice(1);
    console.log("update middleware check is done");
    next();
};
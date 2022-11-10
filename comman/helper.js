
const jwt = require('jsonwebtoken');
const env = require("../.env");
const usersService = require("../users/usersServices");
const bcrypt = require('bcrypt');




// jwt token

function tokenJwt(users) {
    const tokenData = {
        id:users.dataValues.id,
        role:users.dataValues.role,
        first_name:users.dataValues.first_name,
        last_name:users.dataValues.last_name,
        email:users.dataValues.email,
    }
    const token = jwt.sign( tokenData ,SECRET_KEY);
    return token;
};

//  Add User Function 
async function addUser(req,res,values) {    
    const data = req.body;
    const match = values.find(element => element == data.role);
    console.log("match",);
    const oldEmail = await usersService.getUser(data.email);
    const oldNumber = await usersService.profile(data.contact_num);

    if ((!oldEmail)&&(oldNumber.length == 0)&&(data.role === match)) {
        
        if (data.password === data.conpassword) {
        
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);
            const users = await usersService.addUsers(data);

            const token = tokenJwt(users);

            const usersData = { ...users.dataValues, token };
            res.status(200).json(usersData);
            console.log("create users is in users controller  ==>>  " + JSON.stringify(usersData));
        } else {
            res.status(401).json({massage:"Invalid Confirm Password"});
            console.log("invalid confirm password in users controller");
        }
    }

    else {
        res.status(401).json({massage:"users Already exits"});
        console.log("users Already exits");
    }
    return;
};



module.exports = {tokenJwt , addUser}
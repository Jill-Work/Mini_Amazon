const usersService = require("./usersServices");
const bcrypt = require('bcrypt');
const env = require("../.env");
const { tokenJwt } = require("../common/common");

// get user
exports.getUser = async (req, res) => {
    try {
        const { email } = req.query;
        const users = await usersService.getUser(email)
        console.log("users",users);
        res.status(200).json(users);
    } catch (error) {
        res.status(403).json({
            message: error + 'Server error occurred'
        })
    }
};

// get users
exports.getUsers = async (req, res) => {
    try {
        const { query } = req.query;
        let condition = {};
        if (req.query.search) {
            condition = {
                where: { "email": query.search }
            }
        } else if (query.size && query.page) {
            condition = {
                limit: parseInt(query.size),
                offset: parseInt(query.size) * parseInt((query.page - 1)),
            }
        }
        const users = await usersService.getUsers(condition);
        res.status(200).json(users);
    } catch (error) {
        res.status(403).json({
            message: error + 'Server error occurred'
        })
    }
};

//  Sign Up
exports.signUp = async (req, res) => {
    try {
        const values = ['BUYER', 'SELLER']
        await addUser(req, res, values)
    } catch (error) {
        res.status(403).json({
            message: error + 'Server error occurred'
        })
    }
};

// log in
exports.logIn = async (req, res) => {
    try {
        const { password , email } = req.body;
        // const bodyRole = bodydata.role;
        const users = await usersService.getUser(email);
        const userPass = users.password;
        bcrypt.compare(password, userPass, (err, data) => {
            if (err) throw err

            if (data) {
                const token = tokenJwt(users);
                res.status(200).json({ token });
            } else {
                res.status(404).json({ error: "invalid details" });
            }
        })
    } catch (error) {
        res.status(403).json({
            message: error + 'Server error occurred'
        })
    }
};

// update users
exports.updateUsers = async (req, res) => {
    try {
        const email = req.user.email;
        const body = req.body;
        const dbEmail = await usersService.getUser(email);
        let update = {};
        if (body.firstName.length != 0 ) {
            update.firstName = body.firstName;
        }
        if (body.firstName.length != 0 ) {
            update.lastName = body.lastName;
        }
        if (req.body.hasOwnProperty("contactNumber")) {
            const oldNumber = await usersService.profile(body.contactNumber);
            if (oldNumber.length == 0) {
                update.contactNumber = body.contactNumber;
            } else {
                update.contactNumber = oldNumber.dataValues.contactNumber;
            }
        };
        if (req.body.hasOwnProperty("email")) {
            const oldEmail = await usersService.getUser(req.body.email);
            if (oldEmail == null) {
                update.email = req.body.email;
            } else {
                update.email = oldEmail.dataValues.email;
            }
        };
        
        await usersService.updateUsers(dbEmail.dataValues.email, update);
        res.status(200).json(update);
    } catch (error) {
        res.status(403).json({
            message: error + 'Server error occurred'
        })
    }
};

// change password
exports.changePassword = async (req, res) => {
    try {
        const email = req.user.email;
        const { oldPassword , newPassword , confirmPassword } = req.body;
        const update = {};
        if (newPassword === confirmPassword) {
            const user = await usersService.getUser(email);
            bcrypt.compare(oldPassword, user.password, async (err, data) => {
                if (err) throw err;

                if (data) {
                    const salt = await bcrypt.genSalt(10);
                    update.password = await bcrypt.hash(newPassword, salt);
                    await usersService.updateUsers(email, update);
                    res.status(200).json({ Message: "Your password is updated successfully" });
                } else {
                    res.status(400).json({ Message: "Your password is incorrect" });
                }
            })
        } else {
            res.status(400).json({ Message: "Password didn't match" });
        };
    } catch (error) {
        res.status(403).json({
            message: error + 'Server error occurred'
        })
    }
};

// delete users
exports.deleteUsers = async (req, res) => {
    try {
        const email = query.email;
        await usersService.deleteUsers(email);
        res.status(200).json({ "Deleted is was": email });
    } catch (error) {
        res.status(403).json({
            message: error + 'Server error occurred'
        })
    }
};

// add admin
exports.admin = async (req, res) => {
    try {
        const values = ['ADMIN']
        await addUser(req, res, values);
    } catch (error) {
        res.status(403).json({
            message: error + 'Server error occurred'
        })
    }
};


//  Add User or Admin Function 
async function addUser(req, res, values) {
    const data = req.body;
    const matchRole = values.find(element => element == data.role);
    const oldEmail = await usersService.getUser(data.email);
    const oldNumber = await usersService.profile(data.contactNumber);

    if ((!oldEmail) && (oldNumber.length == 0) && (data.role === matchRole)) {
        if (data.password === data.confirmPassword) {
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);
            const users = await usersService.addUsers(data);
            const token = tokenJwt(users);
            const usersData = { ...users.dataValues, token };
            res.status(200).json(usersData);
        } else {
            res.status(401).json({ Message: "Invalid Confirm Password" });
        }
    } else {
        res.status(401).json({ Message: "users Already exits" });
    }
    return;
};
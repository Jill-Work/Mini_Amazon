const usersService = require("./usersServices");
const bcrypt = require('bcrypt');
const common = require("../common/indexOfCommon");
const { Op } = require("sequelize");

// get user
exports.userDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const existingUser = await usersService.getUserData({
            where: { id },
            attributes: { exclude: ['password'] },
        });
        res.status(200).json(existingUser);
    } catch (error) {
        res.status(403).json({ message: error + 'Server error occurred' });
    }
};

// get users
exports.userList = async (req, res) => {
    try {
        const { query } = req.query;
        let condition = {};
        if (query.search) {
            condition = {
                where: { "email": query.search }
            };
        } else if (query.size && query.page) {
            condition = {
                limit: parseInt(query.size),
                offset: parseInt(query.size) * parseInt((query.page - 1)),
            };
        }
        const users = await usersService.getUserData(condition);
        res.status(200).json(users);
    } catch (error) {
        res.status(403).json({ message: error + 'Server error occurred' });
    }
};

//  Sign Up
exports.userSignUp = async (req, res) => {
    try {
        const values = ['BUYER', 'SELLER']
        await common.createNewUser(req, res, values)
    } catch (error) {
        res.status(403).json({ message: error + 'Server error occurred' });
    }
};

// log in
exports.userLogIn = async (req, res) => {
    try {
        const { password, email, role } = req.body;
        const users = await usersService.getUserData({ where: { email } });
        if (!users) return res.status(404).json({ error: "invalid details check again" });
        console.log(users);
        const userData = {
            firstName: users.firstName,
            lastName: users.lastName,
        }
        if (users) {
            const userPassword = users.password;
            const passwordCompare = await bcrypt.compare(password, userPassword);
            if (passwordCompare) {
                const token = common.tokenJwt(users);
                res.status(200).json({ ...userData, token });
            } else {
                res.status(404).json({ error: "invalid details" });
            }
        } else {
            res.status(404).json({ error: "invalid details" });
        }
    } catch (error) {
        res.status(403).json({ message: error + 'Server error occurred' });
    }
};

// update users
exports.userUpdate = async (req, res) => {
    try {
        const body = req.body;
        const existingUserData = await usersService.getUserData({ where: { id: req.user.id } });
        let update = {};
        if (body.firstName.length != 0) {
            update.firstName = body.firstName;
        }
        if (body.lastName.length != 0) {
            update.lastName = body.lastName;
        }
        const existingUserContactNumber = await usersService.getUserData({ 
            where: { contactNumber: body.contactNumber }
         });
        if (req.body.hasOwnProperty("contactNumber")) {
            if (existingUserContactNumber == null) {
                update.contactNumber = body.contactNumber;
            } else {
                update.contactNumber = existingUserContactNumber.contactNumber;
            }
        };
        const existingUserEmail = await usersService.getUserData({ where: { email: req.body.email } });
        if (req.body.hasOwnProperty("email")) {
            if (existingUserEmail == null) {
                update.email = req.body.email;
            } else {
                update.email = existingUserEmail.email;
            }
        };
        await usersService.updateUser(existingUserData.id, update);
        res.status(200).json(update);
    } catch (error) {
        res.status(403).json({ message: error + ' Server error occurred' })
    }
};

// change password
exports.userPasswordChange = async (req, res) => {
    try {
        const email = req.user.email;
        const { oldPassword, newPassword, confirmPassword } = req.body;
        const update = {};
        if (newPassword === confirmPassword) {
            const user = await usersService.getUserData({ where: { email } });
            bcrypt.compare(oldPassword, user.password, async (err, data) => {
                if (err) throw err;

                if (data) {
                    const salt = await bcrypt.genSalt(10);
                    update.password = await bcrypt.hash(newPassword, salt);
                    await usersService.updateUser(email, update);
                    res.status(200).json({ Message: "Your password is updated successfully" });
                } else {
                    res.status(400).json({ Message: "Your password is incorrect" });
                }
            });
        } else {
            res.status(400).json({ Message: "Password didn't match" });
        };
    } catch (error) {
        res.status(403).json({ message: error + 'Server error occurred' });
    }
};

// delete users
exports.userDelete = async (req, res) => {
    try {
        const email = req.query.email;
        await usersService.deleteUser(email);
        res.status(200).json({ "Deleted account was": email });
    } catch (error) {
        res.status(403).json({ message: error + 'Server error occurred' });
    }
};

// add admin
exports.admin = async (req, res) => {
    try {
        const values = ['ADMIN'];
        await common.createNewUser(req, res, values);
    } catch (error) {
        res.status(403).json({ message: error + 'Server error occurred' });
    }
};



//get route permission 
exports.listOfRoute = async (req, res) => {
    try {
        const { operationsName, role } = req.query
        const permissionList = await usersService.listOfRoute(operationsName, role);
        res.status(200).json(permissionList);
    } catch (error) {
        res.status(403).json({ message: error + 'Server error occurred' });
    }
};

//add route permission
exports.addRoute = async (req, res) => {
    try {
        let { operationsName, role, routes } = req.body;
        const existingPermission = await usersService.findOnePermission({
            where:
            {
                operationsName: operationsName,
                role: role,
            }
        });
        if (!existingPermission) {
            role = role.toUpperCase();
            routes = common.permission[operationsName];
            const permissionAdded = await usersService.addPermission({ operationsName, role, routes });
            res.status(200).json(permissionAdded);
        } else {
            res.status(403).json({ message: 'Already Exist' });
        };
    } catch (error) {
        res.status(403).json({ message: error + 'Server error occurred' });
    };
};

//delete route permission
exports.deleteRoute = async () => {
    try {
        await usersService.deletePermission(id);
        res.status(200).json({ "Deleted id was": id });
    } catch (error) {
        res.status(403).json({ message: error + 'Server error occurred' });
    }
};
const usersService = require("./usersServices");
const bcrypt = require('bcrypt');
const common = require("../common/indexOfCommon");
const { Op } = require('sequelize')


// test
exports.test = async (req, res) => {
    try {
        res.send("hello")
    } catch (error) {
        res.status(403).json({ message: error + ' Server error occurred' });
    }
}

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
        res.status(403).json({ message: error + ' Server error occurred' });
    }
};

// get users
exports.userList = async (req, res) => {
    try {
        const { emailSearch, numberSearch, size, page } = req.query;
        let condition = {};
        if (emailSearch || numberSearch) {
            condition = {
                where: {
                    [Op.or]: [
                        { email: { [Op.like]: '%' + emailSearch + '%' } },
                        { contactNumber: { [Op.like]: '%' + numberSearch + '%' } },
                    ]
                },
                attributes: { exclude: ['password'] }
            };
        } else if (size && page) {
            condition = {
                limit: parseInt(size),
                offset: parseInt(size) * parseInt((page - 1)),
            };
        } else if (condition = {}) {
            condition = { attributes: { exclude: ['password'] } };
        }
        const users = await usersService.getUsersList(condition);
        for (var i = 0; i < users.length; i++) {
            delete users.password;
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(403).json({ message: error + ' Server error occurred' });
    }
};

//  Sign Up
exports.userSignUp = async (req, res) => {
    try {
        const values = ['BUYER', 'SELLER']
        await common.createNewUser(req, res, values)
    } catch (error) {
        res.status(403).json({ message: error + ' Server error occurred' });
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
        res.status(403).json({ message: error + ' Server error occurred' });
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
        const existingContactNumberOrEmail = await usersService.getUsersList({
            where: {
                [Op.or]: [
                    { contactNumber: body.contactNumber },
                    { email: req.body.email }
                ]
            }
        });

        if ((req.body.hasOwnProperty("contactNumber")) || (req.body.hasOwnProperty("email"))) {
            if (existingContactNumberOrEmail.length == 0) {
                update.contactNumber = body.contactNumber;
                update.email = body.email;
            } else {
                for (let i = 0; i < existingContactNumberOrEmail.length; i++) {
                    const element = existingContactNumberOrEmail[i];
                    if (element.contactNumber === parseInt(body.contactNumber)) {
                        return res.status(400).json({ message: "Contact Number Already Exits" });
                    }
                    if (element.email === body.email) {
                        return res.status(400).json({ message: "Contact EmailF Already Exits" });
                    }
                };
            }
        };
        update.updated_at = new Date(),
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
                    update.updated_at = new Date();
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
        res.status(403).json({ message: error + ' Server error occurred' });
    }
};

// delete users
exports.userDelete = async (req, res) => {
    try {
        const email = req.query.email;
        await usersService.deleteUser(email);
        res.status(200).json({ "Deleted account was": email });
    } catch (error) {
        res.status(403).json({ message: error + ' Server error occurred' });
    }
};

// add admin
exports.admin = async (req, res) => {
    try {
        const values = ['ADMIN'];
        await common.createNewUser(req, res, values);
    } catch (error) {
        res.status(403).json({ message: error + ' Server error occurred' });
    }
};



//get route permission 
exports.listOfRoute = async (req, res) => {
    try {
        const { operationsName, role } = req.query
        const permissionList = await usersService.listOfRoute(operationsName, role);
        res.status(200).json(permissionList);
    } catch (error) {
        res.status(403).json({ message: error + ' Server error occurred' });
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
        res.status(403).json({ message: error + ' Server error occurred' });
    };
};

//delete route permission
exports.deleteRoute = async () => {
    try {
        await usersService.deletePermission(id);
        res.status(200).json({ "Deleted id was": id });
    } catch (error) {
        res.status(403).json({ message: error + ' Server error occurred' });
    }
};
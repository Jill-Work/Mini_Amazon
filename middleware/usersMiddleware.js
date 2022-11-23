const model = require("../models/db");
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');


exports.userAuth = (req, res, next) => {
    const authorization = req.headers['authorization'];
    const tokenId = authorization && authorization.split(' ')[1];

    if (authorization == null) return res.status(404).json({ error: "Token is Null" });
    jwt.verify(tokenId, SECRET_KEY, async (err, user) => {
        if (err) {
            res.status(404).json({
                error: err.message
            });
        } else {
            const routes = req.path;
            const role = user.role;
            const dbAuth = await model.routeAuth.findOne({ where: { role, routes } });
            if (dbAuth) {
                const dbRole = dbAuth.dataValues.role;
                if ((dbRole == role) || (role == "ADMIN")) {
                    console.log("auth middleware check is done");
                    req.user = user;
                    next();
                }
            } else {
                res.status(403).json({
                    'error': 'you are not authorize to this page'
                });
                return;
            }
        }
    })
};

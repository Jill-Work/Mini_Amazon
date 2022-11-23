const model = require("../models/db");
const jwt = require('jsonwebtoken');

exports.authOfUsers = (req, res, next) => {
    const authorization = req.headers['authorization'];
    const tokenId = authorization && authorization.split(' ')[1];

    if (authorization == null) return res.status(404).json({ error: "Token is Null" });
    jwt.verify(tokenId, SECRET_KEY, async (err, user) => {
        if (err) {
            res.status(404).json({ error: err.message });
        } else {
            const routes = req.path;
            const roleFromToken = user.role;
            const authFromDatabase = await model.routeAuth.findOne({ where: { role: roleFromToken, routes } });
            if (authFromDatabase) {
                const roleFromDatabase = authFromDatabase.dataValues.role;
                if ((roleFromDatabase == roleFromToken) || (roleFromToken == "ADMIN")) {
                    console.log("auth middleware check is successfully");
                    req.user = user;
                    next();
                }
            } else {
                res.status(403).json({ error: 'you are not authorize to this page' });
                return;
            }
        }
    })
};

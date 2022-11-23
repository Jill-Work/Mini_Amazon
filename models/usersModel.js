const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    const users = sequelize.define('users', {
        id: {
            type: Sequelize.UUID, 
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        role: {
            type: DataTypes.STRING(100)
        },
        firstName: {
            type: DataTypes.STRING(100)
        },
        lastName: {
            type: DataTypes.STRING(100)
        },
        contactNumber: {
            type: DataTypes.INTEGER(10)
        },
        email: {
            type: DataTypes.STRING(100)
        },
        password: {
            type: DataTypes.STRING(225)
        },
    }, {
        underscored: true,
    })
    return users;
};



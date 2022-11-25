const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const permission = sequelize.define('permission', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        operationsName: {
            type: DataTypes.STRING(100)
        },
        role: {
            type: DataTypes.STRING(100)
        },
        routes:{
            type: DataTypes.STRING(100)
        },
    }, {
        underscored: true,
    })
    return permission;
};



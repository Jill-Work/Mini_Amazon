const express = require('express');
const app = express();

module.exports = (sequelize , DataTypes)=>{
    const users = sequelize.define('routes', {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        role:{
            type:DataTypes.STRING(10)
        },
        routes:{
            type:DataTypes.STRING(10)
        }    
    },{
        timestamps:false,
        underscored:true,
    })
    return users;
};


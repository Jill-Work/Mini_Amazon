 // require module
const express = require('express');
const app = express();

 
 
// define model

module.exports = (sequelize , DataTypes)=>{
    const users = sequelize.define('users', {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        role:{
            type:DataTypes.TEXT,
        },
        first_name:{
            type:DataTypes.STRING(100)
        },
        last_name:{
            type:DataTypes.STRING(100)
        },
        contact_num:{
            type:DataTypes.INTEGER(10)
        },
        email:{
            type:DataTypes.STRING(100)
        },
        password:{
            type:DataTypes.STRING(225)
        },     
    },{
        timestamps:false,
    })
    return users;
};



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
        role: {
            type:DataTypes.STRING(100)
          },
        firstName:{
            type:DataTypes.STRING(100)
        },
        lastName:{
            type:DataTypes.STRING(100)
        },
        contactNumber:{
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
        underscored:true,
    })
    return users;
};



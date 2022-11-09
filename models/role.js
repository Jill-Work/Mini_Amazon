 // require module
 const express = require('express');
 const app = express();
 
  
  
 // define model
 
 module.exports = (sequelize , DataTypes)=>{
     const users = sequelize.define('roles', {
         id:{
             type:DataTypes.INTEGER,
             autoIncrement: true,
             primaryKey: true
         },
         role:{
             type:DataTypes.STRING(10)
         }    
     },{
         timestamps:false,
     })
     return users;
 };
 
 
 
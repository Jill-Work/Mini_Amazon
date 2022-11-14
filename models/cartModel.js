 // require module
 const express = require('express');
const { Sequelize } = require('./db');

 const app = express();

 // define model

 module.exports = (sequelize , DataTypes)=>{
    const cart = sequelize.define('carts', {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        items: {
            type:DataTypes.STRING(100)
        },
        totalItems: {
            type:DataTypes.STRING(100)
        },
        totalPrice: {
            type: DataTypes.STRING(100)
        }
    },{
        timestamps:false,
    })
    return cart;
};



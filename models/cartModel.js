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
        buyerId:{
            type:DataTypes.INTEGER,
            model: 'user',
            key: 'id'
        },
        sellerId:{
            type:DataTypes.INTEGER,
            model: 'user',
            key: 'id'
        },
        productId: {
            type:DataTypes.INTEGER,
            model: 'product',
            key: 'id'
        },
        price: {
            type:DataTypes.INTEGER,
        },
        quantity: {
            type:DataTypes.INTEGER,
        },
        total:{
            type:DataTypes.INTEGER,
        }
    },{
        timestamps:false,
        underscored:true,
    })
    return cart;
};



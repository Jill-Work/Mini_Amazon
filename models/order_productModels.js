 // require module
 const express = require('express');
const { Sequelize } = require('./db');

 const app = express();

 // define model

 module.exports = (sequelize , DataTypes)=>{
    const cart = sequelize.define('order_products', {
        orderId:{
            type:DataTypes.INTEGER,
            model: 'orders',
            key: 'id'
        },
        sellerId:{
            type:DataTypes.INTEGER,
            model: 'users',
            key: 'id'
        },
        productId:{
            type:DataTypes.INTEGER,
            model: 'products',
            key: 'id'
        },
        quantity: {
            type:DataTypes.INTEGER
        },
        price: {
            type:DataTypes.INTEGER,
        },
        total:{
            type:DataTypes.INTEGER,
        }
    },{
        underscored:true,
    })
    return cart;
};



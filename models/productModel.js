 // require module
 const express = require('express');
const { Sequelize } = require('./db');

 const app = express();

 // define model

 module.exports = (sequelize , DataTypes)=>{
    const product = sequelize.define('products', {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        sellerId:{
            type:DataTypes.INTEGER,
            model: 'user',
            key: 'id'
        },
        productName: {
            type:DataTypes.STRING(100)
        },
        image: {
            type:DataTypes.STRING(100)
        },
        brand: {
            type:DataTypes.STRING(100)
        },
        category: {
            type: DataTypes.ENUM,
            values: ['Clothes','Laptops','Mobiles']
        },
        description: {
            type:DataTypes.STRING(100)
        },
        price : {
            type:DataTypes.INTEGER,
        },
        stock: {
            type:DataTypes.INTEGER,
        }
    },{
        timestamps:false,
        underscored:true,
    })
    return product;
};



 // require module
 const express = require('express');

 const app = express();

 // define model

 module.exports = (sequelize , DataTypes)=>{
    const product = sequelize.define('products', {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        productName: {
            type:DataTypes.STRING(100)
        },
        seller: {
            type:DataTypes.STRING(100)
        },
        image: {
            type:DataTypes.STRING(100)
        },
        brand: {
            type:DataTypes.STRING(100)
        },
        category: {
            // - Clothes
            // - Food
            // - Electronics
            // - Laptop
            // - Mobile
        },
        description: {
            type:DataTypes.STRING(100)
        },
        price : {
            type:DataTypes.INTEGER(10)
        }
    },{
        timestamps:false,
    })
    return product;
};



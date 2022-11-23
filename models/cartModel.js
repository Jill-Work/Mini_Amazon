const { Sequelize } = require('sequelize');

module.exports = (sequelize , DataTypes)=>{
    const cart = sequelize.define('carts', {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        buyerId:{
            type: Sequelize.UUID, 
            model: 'users',
            key: 'id'
        },
        sellerId:{
            type: Sequelize.UUID, 
            model: 'users',
            key: 'id'
        },
        productId: {
            type:DataTypes.INTEGER,
            model: 'products',
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



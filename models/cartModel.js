const { Sequelize } = require('sequelize');

module.exports = (sequelize , DataTypes)=>{
    const cart = sequelize.define('carts', {
        id:{
            type: Sequelize.UUID, 
            defaultValue: Sequelize.UUIDV4,
            autoIncrement: true,
            primaryKey: true
        },
        buyerId:{
            type: Sequelize.UUID, 
            defaultValue: Sequelize.UUIDV4,
            model: 'users',
            key: 'id'
        },
        sellerId:{
            type: Sequelize.UUID, 
            defaultValue: Sequelize.UUIDV4,
            model: 'users',
            key: 'id'
        },
        productId: {
            type: Sequelize.UUID, 
            defaultValue: Sequelize.UUIDV4,
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
        underscored:true,
    })
    return cart;
};



const { Sequelize } = require('sequelize');

module.exports = (sequelize , DataTypes)=>{
    const orderProduct = sequelize.define('order_products', {
        orderId:{
            type: Sequelize.UUID, 
            defaultValue: Sequelize.UUIDV4,
            model: 'orders',
            key: 'id'
        },
        productId:{
            type: Sequelize.UUID, 
            defaultValue: Sequelize.UUIDV4,
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
    return orderProduct;
};



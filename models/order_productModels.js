module.exports = (sequelize , DataTypes)=>{
    const cart = sequelize.define('order_products', {
        orderId:{
            type:DataTypes.INTEGER,
            model: 'orders',
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



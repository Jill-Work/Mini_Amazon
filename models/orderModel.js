const { Sequelize } = require('sequelize');

module.exports = (sequelize , DataTypes)=>{
    const cart = sequelize.define('orders', {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        buyerId:{
            type: Sequelize.UUID, 
            defaultValue: Sequelize.UUIDV4,
            model: 'user',
            key: 'id'
        },
        address:{
            type:DataTypes.STRING(100),
        },
        contactNumber: {
            type:DataTypes.INTEGER
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



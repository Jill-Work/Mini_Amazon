module.exports = (sequelize , DataTypes)=>{
    const cart = sequelize.define('orders', {
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
        address:{
            type:DataTypes.STRING(100),
        },
        contactNumber: {
            type:DataTypes.INTEGER
        }
    },{
        timestamps:false,
        underscored:true,
    })
    return cart;
};



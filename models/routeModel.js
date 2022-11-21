module.exports = (sequelize , DataTypes)=>{
    const users = sequelize.define('routes', {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        role:{
            type:DataTypes.STRING(20)
        },
        routes:{
            type:DataTypes.STRING(20)
        }    
    },{
        timestamps:false,
        underscored:true,
    })
    return users;
};


const { Sequelize } = require('sequelize');

module.exports = (sequelize , DataTypes)=>{
    const route = sequelize.define('routes', {
        id:{
            type: Sequelize.UUID, 
            defaultValue: Sequelize.UUIDV4,
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
    return route;
};


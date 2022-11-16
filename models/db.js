//      sequelize import
const {Sequelize , DataTypes, Model}  = require('sequelize'); 
const usersModel = require('./usersModel');

//      passing database = = db name , username , password , host  , dialect
const sequelize = new Sequelize('mini_amazon', 'root', '', {
    host:'localhost',
    dialect:'mysql',
    logging: false      // to log off in console
});

//      sequelize defining  
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//      connecting db to model
db.product = require("./productModel")(sequelize , DataTypes);
db.users = require("./usersModel")(sequelize , DataTypes);
db.cart = require("./cartModel")(sequelize, DataTypes);
db.routeAuth = require("./routeModel")(sequelize , DataTypes);

//      Relationship
db.product.belongsTo(db.users, {foreignKey: 'seller_id'});
// db.users.hasOne(db.product ,{primaryKey: 'id'});
db.cart.belongsTo(db.product,{foreignKey:'product_id'});
// db.users.hasOne(db.cart);

//      sync db
// db.sequelize.sync({force:true})
db.sequelize.sync({force:false})
.then(()=>{
    console.log("##     R E _ S Y N C      ##");
})
.catch((error)=>{
    console.log("##     E R R O R        "+error);
});


//      export db
module.exports=db;
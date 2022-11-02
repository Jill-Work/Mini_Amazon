//      sequelize import
const {Sequelize , DataTypes, Model}  = require('sequelize'); 

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
db.buyer = require("./buyerModel")(sequelize , DataTypes);
db.seller = require("./sellerModel")(sequelize , DataTypes);

//      sync db
db.sequelize.sync({force:false})
.then(()=>{
    console.log("##     R E _ S Y N C      ##");
})
.catch((error)=>{
    console.log("##     E R R O R        "+error);
});


//      export db
module.exports=db;
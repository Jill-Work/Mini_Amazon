const model = require("../models/db");


// get product
exports.getProduct = async (id) => {
    return await model.product.findOne({
        where:{id}
    })
};


// get products
exports.getProducts = async () => {
    return await model.product.findAll({})
};


// insert product
exports.addProduct = async (data) => {
    return await model.product.create(data);
};


// update product
exports.updateProduct = async (id,update) => {
    return await model.product.update(update,{where:{id}});
};


// delete product
exports.deleteProduct = async (id) => {
    return await model.product.destroy({where:{id}});
};

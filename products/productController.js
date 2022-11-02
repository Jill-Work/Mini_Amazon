const productService = require("./productService");


// get Product
exports.getProduct = async (req,res) => { 
    const id = req.params.id;
    console.log("id in Product controller ", id)

    const product = await productService.getProduct(id);
    res.send(product);
};

// get Products
exports.getProducts = async (req,res) => { 
    const products = await productService.getProducts();
    res.send(products);
    console.log("user in controller",products);
 };

// insert Product
exports.addProduct = async (req,res) => { 
    const data = req.body;
    const product = await productService.addProduct(data);
    res.send(product)
    console.log("Product Added  ==>>  "+JSON.stringify(product));    
 };

// update Product
exports.updateProduct = async (req,res) => { 
    const id = req.params.id;
    console.log(id);
    const update = {
        productName: req.body.productName
    }
    console.log("update in Product controller",update);
    const product = await productService.updateProduct(id,update);
    res.send(product);
 };

// delete Product
exports.deleteProduct = async (req,res) => { 
    const id = req.params.id;
    const product = await productService.deleteProduct(id);
    res.send("deleted is was = " + id);
    console.log("deleted Product id is in Product controller  ==>>  " + id);
};

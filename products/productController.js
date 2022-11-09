const productService = require("./productService");


// get Product
exports.getProduct = async (req,res) => { 
    const {id, search} = req.query;
    const product = await productService.getProduct(id, search);
    console.log(product);
    res.send(product); 
};


// insert Product
exports.addProduct = async (req,res) => { 
    const data = req.body;
    console.log(data);
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
    const {id} = req.body;
    const product = await productService.deleteProduct(id);
    res.send("deleted is was = " + id);
};

// Search Product
exports.productHistory = async (req, res) => {
    try {
        const result = await productService.getProductHistory(req, res);
        if(result){
            res.status(200).json({
                message: result.productsHistory,
                count: result.count
            })   
        } 
    } catch (err) {
        console.log("ERRROR", err)
        res.status(403).json({
            message: 'Server error occured'
        })
    }
}

const productService = require("./productService");

// get Product
exports.getProduct = async (req,res) => { 
    try {
        const {id} = req.query;
        const product = await productService.getOneProduct(id);
        res.send(product);        
    } catch (error) {
        res.status(403).json({
            message: 'Product Not Found!'
        })
    }
};

// add Product
exports.addProduct = async (req,res) => {
    try {
        const data = req.body;
        data.sellerId = req.user.id;
        console.log(data);
        const isProductExist = await productService.checkIfExits(data);
        if(isProductExist == null){
            const product = await productService.addProduct(data);
            res.status(403).json(product)
        } else {
            res.status(403).json({
                message: 'Product Already Exits'
            })
        }
    } catch (error) {
        res.status(403).json({
            message: 'Server error occurRed'
        })
    } 
};

// update Product
exports.updateProduct = async (req,res) => {
    try {
        const id = req.params.id;
        const isProductExist = await productService.getProduct(id);
        if(isProductExist) {
            const update = {
                productName: req.body.productName
            }
            const product = await productService.updateProduct(id,update);
            console.log(product);
            res.send(product);
        }else {
            res.status(403).json({
                message: 'Product Not Found!'
            })    
        }
        
    } catch (error) {
        res.status(403).json({
            message: `You can't update the product because Product not exist in the product list`
        })
    } 
 };

// delete Product
exports.deleteProduct = async (req,res) => {
    try {
        const {id} = req.body;
        const isProductExist = await productService.getProduct(id);
        if(isProductExist) {
            const product = await productService.deleteProduct(id);
            res.send("deleted id was = " + id);  
        } else {
            res.status(403).json({
                message: 'Product already deleted!'
            })            
        }      
    } catch (error) {
        res.status(403).json({
            message: 'Product Not Found!'
        })
    } 
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
        res.status(403).json({
            message: 'Server error occurred'
        })
    }
}

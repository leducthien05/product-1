const helper = require("../../helper/newPriceProduct");
const Product = require("../../model/product.model");


module.exports.index = async (req, res) =>{
    const productFeature = await Product.find({
        delete: false,
        status: "active",
        featured: "1"
    });
    const newProductFeature = helper.newPrice(productFeature);

    const productNewBest = await Product.find({
        delete:false,
        status: "active"
    }).limit(6);
    const newProduct = helper.newPrice(productNewBest);
    
    res.render("client/pages/home/index", { 
        title: "Trang chủ",
        productFeature : newProductFeature,
        newProduct: newProduct
    });
}
const createTree = require("../../helper/CreateTree");
const ProductCategory = require("../../model/product-category.model");

module.exports.ProductMidlleware = async (req, res, next    )=>{
    const product = await ProductCategory.find({
        deleted: false,
    });
    const newProductCategory = createTree(product);
    res.locals.ProductCategory = newProductCategory;
    next();
}
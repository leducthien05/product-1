const Product = require("../model/product.model");
const ProductCategory = require("../model/product-category.model");

module.exports.newPrice =(product)=>{
    const newProduct = product.map(item =>{
        item.newPrice = parseInt(item.price * (1 - (item.discountPercentage/100))).toFixed(0);
        return item;
    });
    return newProduct;
}

module.exports.newPriceProduct = (product)=>{
    const newPrice = parseInt(product.price *(1-product.discountPercentage/100)).toFixed(0);
    return newPrice;
}
const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);


const moduleProdut = new mongoose.Schema({
    name: String,
    description: String,
    product_parent_id: String,
    price: Number,
    stock: Number,
    category: String,
    status: String,
    thumbnail:String,
    discountPercentage: Number,
    delete: {
        type: Boolean,
        default: false
    },
    position: Number,
    slug:{
        type:String,
        slug:"name",
        unique: true
    },
    deleteAt: Date

},
{
    timestamps: true
});
//tạo mô hình Mongoose 
const Product = mongoose.model("Product", moduleProdut, "product-1");
//Kết nối ra bên ngoài
module.exports = Product;
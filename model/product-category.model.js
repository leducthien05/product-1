const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const Schema = new mongoose.Schema({
    name: String,
    parent_id: String,
    description: String,
    position: Number,
    status: String,
    thumbnail: String,
    slug: {
        type: String,
        slug: "name"
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt : Date
},
{
    timestamps: true
});

const ProductCategory = mongoose.model('ProductCategory', Schema, "product-category");
module.exports = ProductCategory;
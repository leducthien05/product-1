const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    userID: String,
    product: [
        {
            product_ID: String,
            quantity: Number
        }
    ]
},
{
    timestamps: true
});

const Cart = mongoose.model("carts", cartSchema, "carts");
module.exports = Cart;
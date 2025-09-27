const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    // userID: String,
    idCart: String,
    infoUser: {
        fullName: String,
        phone: String,
        address: String
    },
    product: [
        {
            product_ID: String,
            discountPercentage: Number,
            price: Number,
            quantity: Number
        }
    ],
    status: String,
},
{
    timestamps: true
});

const Order = mongoose.model("Order", orderSchema, "order");
module.exports = Order;
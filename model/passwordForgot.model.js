const mongoose = require("mongoose");

const passwordForgotSchema = mongoose.Schema({
    email: String,
    otp: String,
    expiresAt:{
        type: Date,
        expires: 0
    },
},
{
    timestamps: true
});

const passwordForgot = mongoose.model("passwordForgot", passwordForgotSchema, "passwordForgot");
module.exports = passwordForgot;
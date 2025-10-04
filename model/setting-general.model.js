const mongoose = require("mongoose");

const settinggeneralSchema = mongoose.Schema({
    websiteName: String,
    email: String,
    phone: String,
    logo: String,
    address: String,
    copyright: String
},
{
    timestamps: true
});

const General = mongoose.model("General", settinggeneralSchema, "setting-general");
module.exports = General;
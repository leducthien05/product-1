const mongoose = require("mongoose");
const generate = require("../helper/generate");

const accountsSchema = mongoose.Schema({
    fullname: String,
    email: String,
    phone: String,
    token: {
        type: String,
        default: generate.generateRandomString(20)
    },
    password: String,
    avatar: String,
    roles_ID: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
},
{
    timestamps: true
});

const Accounts = mongoose.model("Accounts", accountsSchema, "accounts");
module.exports = Accounts;
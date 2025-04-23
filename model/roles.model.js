const mongoose = require("mongoose");

const rolesSchema = mongoose.Schema({
    name: String,
    description: String,
    permission: {
        type: Array,
        default: []
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
},
{
    timestamps: true
});

const Roles = mongoose.model("Roles", rolesSchema, "roles");
module.exports = Roles;
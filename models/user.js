const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    role: String,
    active: Boolean
});

module.exports = mongoose.model("User",userSchema);
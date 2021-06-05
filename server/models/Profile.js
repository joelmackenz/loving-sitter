const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    first_name: {
        type: String,
        required: true
    },
      last_name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    home_address: {
        type: String,
        required: true
    },
        description: {
        type: String,
        required: true
    },
    img: {
        data: Buffer,
        contentType: String
    },
    isDogSitter: {
        type: Boolean,
        required: true,
        default: false,
        },
    }, 
    {timestamps: true }
    );

module.exports = Profile = mongoose.model("profile", userSchema);
let mongoose = require("mongoose");

let Message = new mongoose.Schema({
    author: {
        id: Number,
        // id: mongoose.ObjectId,
    },
    body: String,
    time: Date,
});

module.exports = Message = mongoose.model("message", Message);

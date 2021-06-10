let mongoose = require("mongoose");

const Message = new mongoose.Schema({
    author: mongoose.ObjectId,
    body: String,
    time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("message", Message);

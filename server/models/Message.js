let mongoose = require("mongoose");

const Message = new mongoose.Schema({
    author: mongoose.ObjectId,
    body: { type: String, default: " " },
    time: { type: Date, default: Date.now },
});

module.exports = Message;

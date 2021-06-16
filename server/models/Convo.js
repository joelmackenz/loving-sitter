let mongoose = require("mongoose");
const Message = require("./Message");

const Convo = new mongoose.Schema({
    users: [mongoose.ObjectId],
    messages: [Message],
});

module.exports = mongoose.model("Convo", Convo);

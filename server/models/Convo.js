let mongoose = require("mongoose");
const Message = require("./Message");

const Convo = new mongoose.Schema({
    users: [String],
    // users: [mongoose.ObjectId],
    messages: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Message",
            sparse: true,
            unique: false,
        },
    ],
});

module.exports = mongoose.model("Convo", Convo);

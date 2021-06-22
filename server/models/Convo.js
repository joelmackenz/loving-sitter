const mongoose = require("mongoose");

const Messages = require("./Message");

const { ObjectId } = mongoose.Schema;

const Convo = new mongoose.Schema({
    users: [{
        type: ObjectId,
        ref: "user",
        required: true
    }],
    messages: [Messages],
});

module.exports = mongoose.model("Convo", Convo);

const mongoose = require("mongoose");

const Messages = require("./Message");

const { ObjectId } = mongoose.Schema;

const Convo = new mongoose.Schema({
    profiles: [{
        type: ObjectId,
        ref: "profile",
        required: true
    }],
    messages: [Messages],
});

module.exports = mongoose.model("Convo", Convo);

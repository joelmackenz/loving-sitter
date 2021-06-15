let mongoose = require("mongoose");

const Convo = new mongoose.Schema({
    users: [mongoose.ObjectId],
    messages: {
        unique: false,
        sparse: true,
        type: [
            {
                type: mongoose.Schema.Types.Mixed,
                ref: "messages",
            },
        ],
    },
});

module.exports = mongoose.model("Convo", Convo);

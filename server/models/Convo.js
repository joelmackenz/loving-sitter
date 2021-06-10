let mongoose = require("mongoose");

const Convo = new mongoose.Schema({
    users: [mongoose.ObjectId],
    messages: {
        unique: false,
        sparse: true,
        type: [mongoose.Schema.Types.Mixed],
    },
});

module.exports = mongoose.model("Convo", Convo);

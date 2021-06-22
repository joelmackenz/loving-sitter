let mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema;

const Message = new mongoose.Schema({
    author: {
        type: ObjectId,
        ref: 'user',
        required: true
    },
    text: {
        type: String,
        required: true
    },
},{ timestamps: true });

module.exports = Message;

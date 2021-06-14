const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema;

const requestSchema = new Schema({
  user_id: {
    type: ObjectId,
    ref: "user",
    required: true
  },
  sitter_id: {
    type: ObjectId,
    ref: "Profile",
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  accepted: {
    type: Boolean,
    default: false
  },
  declined: {
    type: Boolean,
    default: false
  },
  paid: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model("Request", requestSchema);

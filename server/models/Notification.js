const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema;

const notificationSchema = new Schema({
  user: {
    type: ObjectId,
    ref: "user",
  },
  type: {
    type: String,
    enum: [
      'SERVICE_REQUEST',
      'VIEWED_ACCOUNT',
      'SERVICE_ACCEPTED', // In future, if the user posts a job
      'SERVICE_DECLINED', // then these notifications will be helpful
    ],
  },
  title: {
    type: String,
    required: true,
    maxlength: 32
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  readStatus: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports =  mongoose.model("Notification", notificationSchema);

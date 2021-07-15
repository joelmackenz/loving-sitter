const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema;

const notificationSchema = new Schema({
  userReceiverId: {
    type: ObjectId,
    ref: "user",
    required: true
  },
  userCreatorId: {
    type: ObjectId,
    ref: "user",
    required: true
  },
  type: {
    type: String,
    enum: [
      'SERVICE_REQUEST',
      'SERVICE_ACCEPTED',
      'SERVICE_DECLINED',
      'VIEWED_ACCOUNT',
    ],
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  readStatus: {
    type: Boolean,
    default: false
  },
  requestId: {
    type: ObjectId,
    ref: 'Request'
  },
  userCreatorProfileImg: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports =  mongoose.model("Notification", notificationSchema);

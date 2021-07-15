const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema;

const profileSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: "user",
    required: true,
    unique: true,
  },
  isAvailable: { 
    type: Boolean, 
    default: false 
  },
  availableDays: [{
    type: String,
    enum: [
      'mon',
      'tues',
      'wed',
      'thurs',
      'fri',
      'sat',
      'sun',
    ],
  }],  
  phone: String,
  city: String,
  description: String,
  profileImg: String,
  coverImg: String,
  priceRate: Number,
});

module.exports = Profile = mongoose.model("profile", profileSchema);

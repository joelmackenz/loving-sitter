const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema;

const profileSchema = new Schema({
  userId: {
    type: ObjectId,
    required: true,
    unique: true,
  },
  isAvailable: { 
    type: Boolean, 
    default: false 
  },
  phone: String,
  city: String,
  description: String,
  profileImg: String,
  coverImg: String,
  startDate: Date,
  endDate: Date,
  priceRate: Number,
});

module.exports = Profile = mongoose.model("profile", profileSchema);

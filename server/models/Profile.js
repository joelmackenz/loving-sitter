const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  isDogSitter: { type: Boolean, require: true, default: false },
  isAvailable: { type: Boolean, require: true, default: false },
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  gender: String,
  birthDate: Date,
  email: String,
  phoneNumber: String,
  address: String,
  description: String,
  profileImg: String,
  coverImg: String,
  galleryImg: [String],
  availability: [String],
  price: Number,
});

module.exports = Profile = mongoose.model("profile", profileSchema);
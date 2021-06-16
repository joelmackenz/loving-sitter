const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      firstName: String,
      lastName: String,
      profileImg: String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    message: String,
  },
  {
    timestamps: true,
  }
);

module.exports = Review = mongoose.model("review", reviewSchema);

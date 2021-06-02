const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    name: [
        {
    first_name: {
        type: String,
        required: true
      },
      last_name: {
        type: String,
        required: true
      }
    }
],
phone: {
    type: String,
    required: false
  },
  home_address: {
    type: String,
    required: true
  },
    description: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }

    
});

module.exports = Profile = mongoose.model("profile", userSchema);
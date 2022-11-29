const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    minlength: [3, "Username must contain minimum 3 characters"],
    maxlength: [20, "Username length must not be more than 20 characters"],
    trim: true,
  },
  role: {
    type: String,
    default: "user",
  },
  password: {
    type: String,
    required: [true, "You must provide a password"],
    trim: true,
    minlength: [
      5,
      "You must provide a password tha contains at least 5 characters.",
    ],
  },
  confirmPassword: {
    type: String,
    require: [true, "Please confirm your password"],
    trim: true,
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Passwords are not the same",
    },
    profileImg: {
      type: Buffer,
      contentType: String,
    },
  },
});
const User = new mongoose.model("User", userSchema);
module.exports = User;

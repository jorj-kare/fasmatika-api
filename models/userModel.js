const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
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
    },
    profileImg: {
      type: String,
    },
    posts: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
    },
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.isPasswordCorrect = async function (
  candidatePassword,
  password
) {
  return await bcrypt.compare(candidatePassword, password);
};

const User = new mongoose.model("User", userSchema);
module.exports = User;

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title."],
  },
  content: {
    type: String,
    required: [true, "You need to provide content"],
  },
  img: {
    type: Buffer,
    contentType: String,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Post = new mongoose.model("Post", postSchema);

module.exports = Post;

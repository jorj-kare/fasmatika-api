const Post = require("../models/postModel");
const catchAsync = require("../utils/catchAsync");
const CustomError = require("../utils/customError");
exports.createPost = catchAsync(async (req, res, next) => {
  const newPost = await Post.create(req.body);
  res.status(201).json({
    status: "success",
    data: newPost,
  });
});

exports.getPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find();
  res.status(200).json({
    status: "success",
    data: posts,
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedPost)
    return next(new CustomError("There is no post with this id", 404));
  res.status(200).json({
    status: "success",
    data: updatedPost,
  });
});
exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) return next(new CustomError("No post found with this id", 404));
  res.status(204).json({
    status: "success",
    data: null,
  });
});

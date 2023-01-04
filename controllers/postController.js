const Post = require("../models/postModel");
const catchAsync = require("../utils/catchAsync");
const CustomError = require("../utils/customError");
const uploadImage = require("../utils/uploadImage");
const multer = require("multer");

exports.createPost = catchAsync(async (req, res, next) => {
  const uploadResponse = await uploadImage(req);
  const data = {
    title: req.body.title,
    content: req.body.content,
    img: uploadResponse.secure_url,
  };
  const newPost = await Post.create(data);
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

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/posts");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${Date.now()}.${ext}`);
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(new CustomError("Not an image!, please upload an image", 400), false);
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadPostImg = upload.single("img");

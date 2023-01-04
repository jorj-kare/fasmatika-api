const cloudinary = require("cloudinary").v2;
const catchAsync = require("../utils/catchAsync");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadImage = catchAsync(async (req) => {
  const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
    public_id: req.file.filename.split(".")[0],
  });
  fs.unlinkSync(req.file.path);

  return uploadResponse;
});
module.exports = uploadImage;

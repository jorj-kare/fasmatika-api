const catchAsync = require("../utils/catchAsync");
const CustomError = require("../utils/customError");
const uploadImage = require("../utils/uploadImage");
const User = require("../models/userModel");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
const createToken = (user, res) => {
  const token = signToken(user._id.toHexString());
  const cookiesOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  if (process.env.NODE_ENV === "production") cookiesOptions.secure = true;
  res.cookie("jwt", token, cookiesOptions);
  user.password = undefined;

  res.status(200).json({
    status: "success",
    token,
    data: user,
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const uploadResponse = await uploadImage(req);
  const data = {
    username: req.body.username,
    password: req.body.password,
    confirmPassword: req.body.passwordConfirm,
    profileImg: uploadResponse.secure_url,
  };
  const newUser = await User.create(data);

  if (!newUser)
    return next(new CustomError("Something went wrong please try again.", 400));
  res.status(201).json({
    status: "success",
    data: newUser,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password)
    return next(new CustomError("Please provide username and password", 404));
  const user = await User.findOne({ username }).select("+password");

  if (!user || !(await user.isPasswordCorrect(password, user.password)))
    return next(new CustomError("Incorrect username or password", 404));
  createToken(user, res);
});

exports.restrict = catchAsync(async (req, res, next) => {
  let token;
  console.log(req.cookies.jwt);
  if (req.headers.authorization && req.headers.startWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    console.log(Date.now());

    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new CustomError("You are not logged in, please login to continue.", 401)
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded);
  if (!user)
    return next(new CustomError("Invalid token please try again", 400));
  req.user = user;
  console.log(user);

  next();
});

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/users");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.filename}.${ext}`);
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(new CustomError("Not an image!, please upload an image", 400), false);
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadProfileImg = upload.single("profileImg");

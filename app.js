const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const app = express();
const postRouter = require("./routes/postRoutes");
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/user", userRouter);

module.exports = app;

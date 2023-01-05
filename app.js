const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const hpp = require("hpp");
const app = express();
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

app.use(cookieParser());
app.use(express.json());
// app.use(cors());
// app.use(helmet());
// app.use(
//   hpp({
//     whitelist: [],
//   })
// );

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept"

  // );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization,X-Auth-Token"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
// const scriptSrcUrls = ["https://fasmatika.netlify.app/login"];
// const styleSrcUrls = ["https://fasmatika.netlify.app/login"];
// const connectSrcUrls = ["https://fasmatika.netlify.app/login"];
// const fontSrcUrls = ["https://fasmatika.netlify.app/login"];
// const imgSource = ["https://fasmatika.netlify.app/login"];

// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: [],
//       connectSrc: ["'self'", ...connectSrcUrls],
//       scriptSrc: ["'self'", ...scriptSrcUrls],
//       styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
//       workerSrc: ["'self'", "blob:"],
//       objectSrc: [],
//       imgSrc: ["'self'", "blob:", "data:", ...imgSource],
//       fontSrc: ["'self'", ...fontSrcUrls],
//     },
//   })
// );
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/user", userRouter);

module.exports = app;

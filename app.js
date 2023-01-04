const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const app = express();
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

// app.use(cors());
app.use(helmet());
// const scriptSrcUrls = [];
// const styleSrcUrls = [];
// const connectSrcUrls = [];
// const fontSrcUrls = [];
// const imgSource = [];

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
// );https://github.com/sutin1234/sveltekit-mongodb/blob/main/src/lib/counter/counter.spec.tsrail
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/user", userRouter);

module.exports = app;

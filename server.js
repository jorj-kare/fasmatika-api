const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = require("./app");
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);

mongoose
  .connect(DB)
  .then(() => console.log("You have successfully connected to the database!"));

const server = app.listen(process.env.PORT, () =>
  console.log(`Success tour application is running on port:${process.env.PORT}`)
);

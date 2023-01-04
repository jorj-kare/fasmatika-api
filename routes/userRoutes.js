const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router
  .route("/signUp")
  .post(userController.uploadProfileImg, userController.signUp);
router.route("/login").post(userController.login);
module.exports = router;

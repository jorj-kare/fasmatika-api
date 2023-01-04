const express = require("express");
const postController = require("../controllers/postController");
const { restrict } = require("../controllers/userController");
const router = express.Router();

router
  .route("/")
  .get(postController.getPosts)
  .post(restrict, postController.uploadPostImg, postController.createPost);
router
  .route("/:id")
  .patch(postController.updatePost)
  .delete(postController.deletePost);
module.exports = router;

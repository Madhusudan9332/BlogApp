const express = require("express");
const commentController = require("../controller/comment");
const authMiddleware = require("../middlewares/userAuthentication");

const router = express.Router();

router.post(
  "/v1/api/comment/create",
  authMiddleware,
  commentController.createComment
);
router.get(
  "/v1/api/comment/:id",
  authMiddleware,
  commentController.readComment
);
router.put(
  "/v1/api/comment/update/:id",
  authMiddleware,
  commentController.updateComment
);
router.delete(
  "/v1/api/comment/delete/:id",
  authMiddleware,
  commentController.deleteComment
);

module.exports = router;

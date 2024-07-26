const express = require("express");
const blogController = require("../controller/blog");
const authMiddleware = require("../middlewares/userAuthentication");

const router = express.Router();

router.post(
  "/v1/api/blog/create",
  authMiddleware,
  blogController.createBlog
);
router.get(
  "/v1/api/blog/all",
  authMiddleware,
  blogController.readAllBlogs
);
router.get(
  "/v1/api/blog/:id",
  authMiddleware,
  blogController.readBlog
);
router.put(
  "/v1/api/blog/update/:id",
  authMiddleware,
  blogController.updateBlog
);
router.delete(
  "/v1/api/blog/delete/:id",
  authMiddleware,
  blogController.deleteBlog
);

module.exports = router;

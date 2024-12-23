const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/authMiddlewares");
const { isAvilableUserProfile } = require("../middlewares/profileMiddlewares");
const  uploads  = require("../middlewares/uploadMiddleware");

const {
  displayBlogPostControler,
  createBlogGetControler,
  createBlogPOSTControler,
  updateBlogGetControler,
  updateBlogPOSTControler,
  deleteBlogGetControler,
  blogPostImageUploadControler,
} = require("../controlers/blogPostControlers");



// setup route
router.get(
  "/blog-post/:blogID",
  isAuthenticated,
  isAvilableUserProfile,
  displayBlogPostControler
);
router.get(
  "/create",
  isAuthenticated,
  isAvilableUserProfile,
  createBlogGetControler
);
router.post(
  "/create",
  isAuthenticated,
  isAvilableUserProfile,
  createBlogPOSTControler
);

router.get(
  "/update/:blogID",
  isAuthenticated,
  isAvilableUserProfile,
  updateBlogGetControler
);
router.post(
  "/update/:blogID",
  isAuthenticated,
  isAvilableUserProfile,
  updateBlogPOSTControler
);

router.delete(
  "/delete/:blogID",
  isAuthenticated,
  isAvilableUserProfile,
  deleteBlogGetControler
);

router.post(
  "/blog-post-image-upload",
  isAuthenticated,
  isAvilableUserProfile,
  uploads.single("blog-post-image"),
  blogPostImageUploadControler
);

module.exports = router;

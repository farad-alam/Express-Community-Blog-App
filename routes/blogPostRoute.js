const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/authMiddlewares");
const { isAvilableUserProfile } = require("../middlewares/profileMiddlewares");

const {
  displayBlogPostControler,
  createBlogGetControler,
  createBlogPOSTControler,
  updateBlogGetControler,
  updateBlogPOSTControler,
  deleteBlogGetControler,
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

router.post(
  "/delete/:blogID",
  isAuthenticated,
  isAvilableUserProfile,
  deleteBlogGetControler
);

module.exports = router;

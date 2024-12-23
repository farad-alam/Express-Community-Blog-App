const { validationResult } = require("express-validator");
const Post = require("../models/Post");
const Profile = require("../models/Profile");

exports.displayBlogPostControler = (req, res, next) => {
  res.render("pages/blog/displayBlogPost");
};

exports.createBlogGetControler = (req, res, next) => {
  res.render("pages/blog/createBlogPost", {
    errors: [],
    values: {},
  });
};

exports.createBlogPOSTControler = async (req, res, next) => {
  let { title, body, tags } = req.body;
  // input error handling
  const error = validationResult(req);
  console.log(error);
  if (!error.isEmpty()) {
    return res.render("pages/blog/createBlogPost", {
      errors: error.array(),
      values: req.body,
    });
  }

  if (tags) {
    tags = tags.split(",").map((t) => t.trim());
  }

  // saved the new Post
  let newPost = new Post({
    author: req.session.user.id,
    title: title,
    thumbnail: "",
    body,
    tags: tags,
  });

  // if have thumbnail add it
  if (req.file) {
    newPost.thumbnail = `/uploads/${req.file.filename}`;
  }

  try {
    let savedPost = await newPost.save();
    // console.log(savedPost)
    let currentUserProfile = await Profile.findOneAndUpdate(
      { user: req.session.user.id },
      { $push: { post: savedPost._id } },
      { new: true }
    );
    // console.log(currentUserProfile)

    req.flash("success", "New Post created successfully!");
    res.redirect(`/blog/update/${savedPost._id}`);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

exports.updateBlogGetControler = async (req, res, next) => {
  const { blogID } = req.params;

  try {
    const tergatedPost = await Post.findOne({ _id: blogID });
    console.log(tergatedPost);
    return res.render("pages/blog/updateBlogPost", {
      errors: [],
      values: tergatedPost,
    });
  } catch (error) {
    console.log(error);
    req.flash("warning", "Can not find your post");
    return res.redirect("/dashboard");
  }
};

exports.updateBlogPOSTControler = async (req, res, next) => {
  let { title, body, tags } = req.body;
  const { blogID } = req.params;


  // input error handling
  const error = validationResult(req);
  console.log(error);
  if (!error.isEmpty()) {
    let values = req.body
    values._id = blogID
    return res.render("pages/blog/updateBlogPost", {
      errors: error.array(),
      values: req.body,
    });
  }

  try {
    // check the existing post
    let post = await Post.findOne({
      author: req.session.user.id,
      _id: blogID,
    });

    if (!post) {
      let error = new Error("$04 page not found");
      error.status(404);
      throw error;
    }

    if (tags) {
      tags = tags.split(",").map((t) => t.trim());
    }

    // if have thumbnail add it
    let thumbnail = post.thumbnail
    if (req.file) {
      thumbnail = `/uploads/${req.file.filename}`;
    }

    // update the new post
    let updatePost = await Post.findOneAndUpdate(
      { _id: blogID },
      { $set: { title, body, thumbnail, tags } },
      { new: true }
    );
    console.log(updatePost)

    req.flash("success", "Post Updated successfully!");
    res.redirect(`/blog/update/${updatePost._id}`);
  } catch (error) {
    console.log(error);
    req.flash("error", "Failed to Update your Post")
    return res.redirect("/dashboard")
  }

};

exports.deleteBlogGetControler = (req, res, next) => {};

exports.blogPostImageUploadControler = (req, res, next) => {
  if (!req.file) {
    res.status(400).json({ message: "No file to use" });
  }

  res.status(200).json({ imageURL: `/uploads/${req.file.filename}` });
};

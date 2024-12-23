const Profile = require("../models/Profile");
const Post = require("../models/Post");

exports.dashboardGetControler = async (req, res, next) => {

  try {
      const userProfile = await Profile.findOne({ user: req.session.user.id });

      const posts = await Post.find({
        author: req.session.user.id,
      });
      console.log(posts)
      return res.render("pages/dashboard", { userProfile, posts });
  } catch (error) {
    console.log(first)
    req.flash("info", "Something unuseal happen")
    res.redirect("/")
  }
  
};

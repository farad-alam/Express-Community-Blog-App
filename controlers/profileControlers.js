const Profile = require('../models/Profile');
const flash = require("connect-flash");
const {validationResult} = require('express-validator');

exports.profileGetControlers = async (req, res, next) => {

  try {
    const userProfile = await Profile.findOne({ user: req.session.user.id });
    return res.render("pages/profile/profile", { userProfile });
  } catch (error) {
    console.log(error)
    req.flash("warning", "Something went wrong on profile route, try agin later")
    return res.redirect("/")
  }

}

exports.createProfileGetControlers = (req, res, next) => {
  res.render("pages/profile/createProfile", {
    errors: [],
    oldInput: {},
  });
};

exports.createProfilePostControlers = async(req, res, next) => {
  const {name,title, bio, website, twitter, linkedin, github} = req.body

  console.log(req.body)
  const error = validationResult(req)
  console.log(error)
  if (!error.isEmpty()) {
    return res.render("pages/profile/createProfile",{
      errors: error.array(),
      oldInput: req.body,
    });
  }

  try {

    const newProfile = new Profile({
      user : req.session.user.id,
      name,
      title,
      bio,
      links : {website, twitter, linkedin, github},
      post: [],
      bookmarks: []
    })

    const savedProfile = await newProfile.save()
    console.log(savedProfile)
    req.flash("success", "Profile Created Successfully!!!")
    return res.redirect("/profile")
    
  } catch (error) {
    console.log(error)
    req.flash("error", "Can not create profile, something went wrong")
    res.redirect("/create-profile")
  }

};

exports.editProfileGetControlers = (req, res, next) => {
  res.render("pages/profile/editProfile");
};

exports.editProfilePostControlers = (req, res, next) => {
  res.render("pages/profile/editProfile");
};
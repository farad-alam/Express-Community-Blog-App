const Profile = require('../models/Profile');
const flash = require("connect-flash");
const {validationResult} = require('express-validator');

exports.profileGetControlers = (req, res, next) => {
    res.render("pages/profile/profile")
}

exports.createProfileGetControlers = (req, res, next) => {
  res.render("pages/profile/createProfile", {
    errors: [],
    oldInput: {},
  });
};

exports.createProfilePostControlers = (req, res, next) => {
  const {name,title, bio, website, twitter, linkedin, github} = req.body
  // console.log(req.body)
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.render("pages/profile/createProfile",{
      errors: error.array(),
      oldInput: req.body,
    });
  }


  res.render("pages/profile/createProfile");
};

exports.editProfileGetControlers = (req, res, next) => {
  res.render("pages/profile/editProfile");
};

exports.editProfilePostControlers = (req, res, next) => {
  res.render("pages/profile/editProfile");
};
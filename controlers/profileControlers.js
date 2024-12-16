const Profile = require('../models/Profile');
const flash = require("connect-flash");

exports.profileGetControlers = (req, res, next) => {
    res.render("pages/profile/profile")
}

exports.createProfileGetControlers = (req, res, next) => {
  res.render("pages/profile/createProfile");
};

exports.createProfilePostControlers = (req, res, next) => {

  res.render("pages/profile/createProfile");
};

exports.editProfileGetControlers = (req, res, next) => {
  res.render("pages/profile/editProfile");
};

exports.editProfilePostControlers = (req, res, next) => {
  res.render("pages/profile/editProfile");
};
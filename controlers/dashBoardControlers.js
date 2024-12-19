const Profile = require("../models/Profile");

exports.dashboardGetControler = async (req, res, next) => {
  const userProfile = await Profile.findOne({ user: req.session.user.id });
  res.render("pages/dashboard", { userProfile });
};

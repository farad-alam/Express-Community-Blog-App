const route = require('express').Router();

// impor middlewares
const {isAuthenticated} = require('../middlewares/authMiddlewares');
const {
    isAvilableUserProfile
} = require("../middlewares/profileMiddlewares");


//import validators
const { profileValidator } = require("../validators/profileValidator");


// import profile controlers
const {
    profileGetControlers,
    createProfileGetControlers,
    createProfilePostControlers,
    editProfileGetControlers,
    editProfilePostControlers
} = require('../controlers/profileControlers');


route.get("/", isAuthenticated, isAvilableUserProfile, profileGetControlers)

route.get("/create-profile", isAuthenticated, createProfileGetControlers)
route.post(
  "/create-profile",
  isAuthenticated,
  profileValidator,
  createProfilePostControlers
);


route.get("/edit-profile", isAuthenticated, isAvilableUserProfile, editProfileGetControlers)
route.post(
  "/edit-profile",
  isAuthenticated,
  isAvilableUserProfile,
  profileValidator,
  editProfilePostControlers
);


module.exports = route;
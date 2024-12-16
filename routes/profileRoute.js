const route = require('express').Router();


const {isAuthenticated} = require('../middlewares/authMiddlewares');
const {
    isAvilableUserProfile
} = require("../middlewares/profileMiddlewares");

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
route.post("/create-profile", isAuthenticated, createProfilePostControlers)


route.get("/edit-profile", isAuthenticated, isAvilableUserProfile, editProfileGetControlers)
route.post("/edit-profile", isAuthenticated, isAvilableUserProfile, editProfilePostControlers)


module.exports = route;
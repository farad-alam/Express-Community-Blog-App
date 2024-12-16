const Profile = require("../models/Profile");
const flash = require("connect-flash");

exports.isAvilableUserProfile = async(req, res, next) => {
    try {
        const userProfile = await Profile.findOne({user: req.session.user.id})
        if (!userProfile) {
            req.flash("warning", "Update your Profile first!")
            return res.redirect("/profile/create-profile")
        }

        return next()
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"Failed to check User Profile"})
    }
}
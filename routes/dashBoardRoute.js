const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/authMiddlewares");
const { isAvilableUserProfile } = require("../middlewares/profileMiddlewares");
const { dashboardGetControler } = require("../controlers/dashBoardControlers");

router.get("/", isAuthenticated, isAvilableUserProfile, dashboardGetControler);

module.exports = router;

const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/auth");

const { dashboardGetControler } = require("../controlers/dashBoardControlers");

router.get("/", isAuthenticated, dashboardGetControler);

module.exports = router;

const router = require('express').Router();

const {
    dashboardGetControler,

} = require("../controlers/dashBoardControlers")


router.get("/", dashboardGetControler);


module.exports = router
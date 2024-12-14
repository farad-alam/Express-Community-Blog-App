const router = require('express').Router();

const {
    signUpGetControler,
    signUpPostControler,
    logInGetControler,
    logInPostControler,
    logOutControler
} = require("../controlers/authControlers")

router.get("/signup", signUpGetControler)
router.post("/signup", signUpPostControler);

router.get("/login", logInGetControler);
router.post("/login", logInPostControler);

router.get("/logout", logOutControler);


module.exports = router
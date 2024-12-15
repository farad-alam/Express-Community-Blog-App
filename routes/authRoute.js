const router = require('express').Router();

const {validateSignUp} = require("../validators/userValidator")

const {
    signUpGetControler,
    signUpPostControler,
    logInGetControler,
    logInPostControler,
    logOutControler
} = require("../controlers/authControlers")

router.get("/signup", signUpGetControler)
router.post("/signup", validateSignUp, signUpPostControler);

router.get("/login", logInGetControler);
router.post("/login", logInPostControler);

router.get("/logout", logOutControler);


module.exports = router
const router = require('express').Router();

const {validateSignUp} = require("../validators/userValidator")

const { projectLoggedRoute } = require("../middlewares/auth");

const {
    signUpGetControler,
    signUpPostControler,
    logInGetControler,
    logInPostControler,
    logOutControler
} = require("../controlers/authControlers")

router.get("/signup", projectLoggedRoute, signUpGetControler)
router.post(
  "/signup",
  [validateSignUp, projectLoggedRoute],
  signUpPostControler
);

router.get("/login", projectLoggedRoute, logInGetControler);
router.post("/login", projectLoggedRoute, logInPostControler);

router.get("/logout", logOutControler);


module.exports = router
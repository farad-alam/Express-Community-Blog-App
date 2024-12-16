const router = require("express").Router();

const { validateSignUp } = require("../validators/userValidator");

const { protectLoggedRoute } = require("../middlewares/authMiddlewares");

const {
  signUpGetControler,
  signUpPostControler,
  logInGetControler,
  logInPostControler,
  logOutControler,
} = require("../controlers/authControlers");

router.get("/signup", protectLoggedRoute, signUpGetControler);
router.post(
  "/signup",
  [validateSignUp, protectLoggedRoute],
  signUpPostControler
);

router.get("/login", protectLoggedRoute, logInGetControler);
router.post("/login", protectLoggedRoute, logInPostControler);

router.get("/logout", logOutControler);

module.exports = router;

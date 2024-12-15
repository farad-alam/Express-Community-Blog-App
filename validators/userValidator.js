const { body } = require("express-validator");


exports.validateSignUp = [
  //validate usename
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username required")
    .isLength({ min: 3, max: 6 })
    .withMessage("User name should be between 3 to 6 charecter"),

  // validate email
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email required to signup")
    .isEmail()
    .withMessage("Invalid Email Address"),

  // validate password
  body("password")
    .isLength({ min: 6 })
    .withMessage("password shouls be greater than 6 charecter"),
    
  // validate confirmpassword
  body("confirmpassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password doesn't Match");
    }
    return true;
  }),
];

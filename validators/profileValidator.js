const {body} = require('express-validator');

exports.profileValidator = [
  // name validation
  body("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please Provide Your Name")
    .isLength({ max: 40 })
    .withMessage("Name should not greter than 40 charecter"),

  // title validation
  body("title")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please Provide Your PROFESSIONAL tITLE")
    .isLength({ max: 70 })
    .withMessage("Title should not greter than 70 charecter"),

  // bio validation
  body("bio")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please Provide a bio")
    .isLength({ max: 300 })
    .withMessage("Bio should not greter than 300 charecter"),

  body("website")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please Provide a website")
    .isURL()
    .withMessage("please Provide a valid website url")
    .isLength({ max: 40 })
    .withMessage("website URL should not greter than 40 charecter"),

  body("twitter")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please Provide a twitter url")
    .isURL()
    .withMessage("please Provide a valid url")
    .isLength({ max: 40 })
    .withMessage("twitter URL should not greter than 40 charecter"),

  body("linkedin")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please Provide a linkedin url")
    .isURL()
    .withMessage("please Provide a valid url")
    .isLength({ max: 40 })
    .withMessage("linkedin URL should not greter than 40 charecter"),

  body("github")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please Provide a github url")
    .isURL()
    .withMessage("please Provide a valid url")
    .isLength({ max: 40 })
    .withMessage("github URL should not greter than 40 charecter"),
];


const { body } = require("express-validator");
const cheerio = require("cheerio");

exports.blogPostValidator = [
  body("title")
    .not()
    .isEmpty()
    .withMessage("Title Cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Tittle can not be greather than 100 charecter")
    .trim(),

  body("body")
    .not()
    .isEmpty()
    .withMessage("Post Body Cannot be empty")
    .trim()
    .custom((value) => {
      let node = cheerio.load(value);
      let text = node.text();
      if (text.length > 5000) {
        throw new Error("Post Body can not be greather than 5000 charecter");
      }
      return true;
    }),

  body("tags").not().isEmpty().withMessage("Tags Cannot be empty").trim(),
];
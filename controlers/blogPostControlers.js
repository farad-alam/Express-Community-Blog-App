exports.displayBlogPostControler = (req, res, next) => {
  res.render("pages/blog/displayBlogPost");
};

exports.createBlogGetControler = (req, res, next) => {
  res.render("pages/blog/createBlogPost");
};

exports.createBlogPOSTControler = (req, res, next) => {
  res.render("pages/blog/createBlogPost");
};

exports.updateBlogGetControler = (req, res, next) => {
  res.render("pages/blog/updateBlogPost");
};

exports.updateBlogPOSTControler = (req, res, next) => {
  res.render("pages/blog/updateBlogPost");
};

exports.deleteBlogGetControler = (req, res, next) => {};


exports.blogPostImageUploadControler = (req, res, next) => {
    if (!req.file) {
        res.status(400).json({"message":"No file to use"})
    }

    res.status(200).json({"imageURL": `/uploads/${req.file.filename}`})
}

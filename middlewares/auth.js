exports.isAuthenticated = (req, res, next) => {
  if (req.session.isLoggedIn) {
    res.locals.isLoggedIn = req.session.isLoggedIn || false;
    next();
  }
  res.redirect("/auth/login");
};

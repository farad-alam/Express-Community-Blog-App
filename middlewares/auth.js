exports.isAuthenticated = (req, res, next) => {
  if (req.session.isLoggedIn) {
    res.locals.isLoggedIn = req.session.isLoggedIn || false;
    return next();
  }
  res.redirect("/auth/login");
};

exports.projectLoggedRoute = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    res.locals.isLoggedIn = req.session.isLoggedIn || false;
    return next();
  }
  res.redirect("/dashboard");
};

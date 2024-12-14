exports.signUpGetControler = (req, res, next) => {
    res.render("pages/auth/signup")
}

exports.signUpPostControler = (req, res, next) => {
        const { username, email, password } = req.body;
        console.log(req.body);
};

exports.logInGetControler = (req, res, next) => {
    res.render("pages/auth/login");
};

exports.logInPostControler = (req, res, next) => {};

exports.logOutControler = (req, res, next) => {};
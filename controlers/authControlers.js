const User = require("../models/User");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");
const { validationResult } = require("express-validator");
const {msg} = require("../utils/utils");



exports.signUpGetControler = async (req, res, next) => {
  return res.render("pages/auth/signup", {
    errors: [],
    oldInput: {},
  });
};

exports.signUpPostControler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(errors.array())
    return res.render("pages/auth/signup", {
      errors: errors.array(),
      oldInput: req.body,
    });
  }

  const { username, email, password } = req.body;

  try {
    // password hashing
    const hashPassword = await bcrypt.hash(password, 11);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    // store user data to the session
    req.session.isLoggedIn = true;
    req.session.user = {
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
    };

    //save the session
    req.session.save((err) => {
      if (err) {
        console.log(err);
        req.flash("error", "Failed  to save the session");
        return res.render("pages/auth/auth");
      }
      req.flash("success", "new user created successfully!!!");
      return res.redirect("/dashboard");
    });

    
    // req.flash("success", "new user created successfully!!!");
    // res.redirect("/dashboard");

    
  } catch (error) {
    // console.log(error)
    if (error.code === 11000) {
      console.log(error.errmsg);
      req.flash("warning", "EMail or Username already exist");
      return res.redirect("/auth/signup");
    }
    res.json({ error: "Condition doesn't match for creating a new user" });
  }
};

exports.logInGetControler = (req, res, next) => {
  res.render("pages/auth/login", {
    errors: [],
    oldInput: {},
    message: {}
  });
};

exports.logInPostControler = async (req, res, next) => {
  const { email, password } = req.body;

  try {

    //get the user
    const user = await User.findOne({ email: email });
    // checking user exist or not
    if (!user) {
      return res.render("pages/auth/login", {
        errors: [
          {
            path: "email",
            msg: "User Not Found With This Email",
          },
        ],
        oldInput : req.body
      });
    }


    // user password validation
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.render("pages/auth/login", {
        errors: [
          {
            path: "email", // forcefully make the path same for display the msg in one place
            msg: "Invalid Credintial",
          },
        ],
        oldInput: req.body,
      });
    }

    // store user data to the session
    req.session.isLoggedIn = true
    console.log(user)
    req.session.user = {id:user._id, username :user.username, email:user.email}


    //save the session
    req.session.save((err)=>{
      if (err) {
        console.log(err)
        req.flash("error", "Failed  to save the session");
        return res.render("pages/auth/login");
      }
      req.flash("success", "Loggedin Successfull")
      return res.redirect("/dashboard");
    })


  } catch (error) {
    console.log(error);
  }
};

exports.logOutControler = (req, res, next) => {
  req.flash("success", "Logout successfull!!!");
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to log out" });
    }
    res.redirect("/auth/login");
  });

};

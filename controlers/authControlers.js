const User = require("../models/User");
const bcrypt = require("bcrypt");
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

    console.log("new user created successfully!!!");
    res.redirect("/dashboard");
  } catch (error) {
    // console.log(error)
    if (error.code === 11000) {
      console.log(error.errmsg);
      console.log("EMail or Username already exist");
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
        return res.render("pages/auth/login", {
          message: msg("Can not save you session!!!", "error"),
        });
      }
      return res.redirect("/");
    })
  } catch (error) {
    console.log(error);
  }
};

exports.logOutControler = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to log out" });
    }
    res.redirect("/auth/login");
  });

};

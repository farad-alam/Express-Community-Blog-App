const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");

exports.signUpGetControler = async (req, res, next) => {
      return res.render("pages/auth/signup", {
        errors: [],
        oldInput: {},
      });
  
};

exports.signUpPostControler = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    // console.log(errors.array())
    return res.render("pages/auth/signup", {
      errors: errors.array(),
      oldInput: req.body
    });
  }


  const { username, email, password, confirmpassword } = req.body;

  // if (password !== confirmpassword) {
  //   res.json({"passwordError":"Password Doesn't Match"})
  // }
  try {
    // password hashing
    const hashPassword  = await bcrypt.hash(password, 11)
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });
    const savedUser = await newUser.save()
    console.log(savedUser)
    console.log("new user created successfully!!!")
    res.redirect('/dashboard')
  } catch (error) {
    // console.log(error)
    if (error.code === 11000) {
        console.log(error.errmsg)
        console.log("EMail or Username already exist")
    }
    res.json({"error": "Condition doesn't match for creating a new user"})
  }

};



exports.logInGetControler = (req, res, next) => {
  res.render("pages/auth/login");
};


exports.logInPostControler = async (req, res, next) => {
    const {email, password} = req.body

    try {
        //get the user
        const user = await User.findOne({email: email})
        // checking user exist or not
        if (!user) {
            res.status(400).json({message: "User Not Found"})
        }

        // user password validation
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
          res.status(400).json({message: "Invalid credintial"})
        }

        // login success
        // res.status(200).json({message: "Successfully loggedin"})
        res.redirect('/dashboard')

    } catch (error) {
        console.log(error)
    }
};

exports.logOutControler = (req, res, next) => {};

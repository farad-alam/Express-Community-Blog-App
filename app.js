require("dotenv").config()
const express = require("express")
const authRoute = require('./routes/authRoute');
const dashBoardRoute = require("./routes/dashBoardRoute");
const profileRoute = require("./routes/profileRoute");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const cors = require("cors");

const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_USER_PASS}@blogcluster.tzdrh.mongodb.net/blogDB?retryWrites=true&w=majority&appName=BlogCluster`;


// Database connection setup
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Successfully connected to MongoDB!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const app = express()

// SESSION MIDDLEWARE SETUP
app.use(
  session({
    secret: process.env.SESSION_SECRATE_KEY, 
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: uri,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);


// Middleware to set `isLoggedIn` for all routes
app.use("*", (req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn || false;
  res.locals.user = req.session.user || null;
  next();
});

app.use(flash());

// Pass flash messages to all views
app.use((req, res, next) => {

  // Collect all types of flash messages
  const types = ["success", "error", "info", "warning"];
  res.locals.messages = types
    .map((type) => {
      return req.flash(type).map((msg) => ({ type, msg }));
    })
    .flat(); // Flatten to a single array

  next();
});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cors());


// View Engine setup
app.set("view engine", "ejs")
app.set("views", "views")

app.use("/auth", authRoute);
app.use("/dashboard", dashBoardRoute);
app.use("/profile", profileRoute);



const uploads = require('./middlewares/uploadMiddleware');

app.get("/", uploads.single("profilePic"), (req, res) => {
  
  res.render("pages/home");
});

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server is Running on Port: ${PORT}`)
})
require("dotenv").config()
const express = require("express")
const authRoute = require('./routes/authRoute');
const dashBoardRoute = require("./routes/dashBoardRoute");
const mongoose = require("mongoose");
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View Engine setup
app.set("view engine", "ejs")
app.set("views", "views")

app.use("/auth", authRoute);
app.use("/dashboard", dashBoardRoute);

app.get('/', (req, res)=>{
    res.render("pages/dashboard")
})

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server is Running on Port: ${PORT}`)
})
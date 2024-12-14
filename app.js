require("dotenv").config()
const express = require("express")
const authRoute = require('./routes/authRoute');
const morgan = require('morgan');

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View Engine setup
app.set("view engine", "ejs")
app.set("views", "views")

app.use("/auth", authRoute);

app.get('/', (req, res)=>{
    res.render("pages/dashboard")
})

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server is Running on Port: ${PORT}`)
})
// Import or require 
const express = require ("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");


// i telling where the files are 
dotenv.config({ path: "./.env"})

const app = express();

//Creating the connection to DB
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: "",
    database: process.env.DATABASE
});

//Here we put all files that we need
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

// Parser url as sent by html form
app.use(express.urlencoded({extended: true}));

app.set("view engine", "hbs");

//Connecting to database
db.connect( (error) => {
    if(error) {
        console.log(error);
    } else {
        console.log("Mysql Connected");
    }
});

//Define routes

app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));











//Connecting to localhost port 3000
app.listen(3000, function(req, res){
    console.log("Server started on port 3000");
});
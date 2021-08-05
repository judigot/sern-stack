// Require .env file
require("dotenv").config();

// *production environment port may not be 5000, hence the "process.env.PORT"
const PORT = process.env.PORT || 3000;

// Load environment
const express = require("express");
const path = require("path");

// Variables
const app = express();
const viewsFolder = `views`;

// Set view engine
app.set("views", path.resolve(__dirname, viewsFolder));
app.set("view engine", "ejs");

//================================================================================//

const Database = require("./app/Classes/Database");
const db = new Database();

/*********
 * MYSQL *
 *********/
//================================================================================//
db.connect();

// get the client
const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "bigbang",
});

// simple query
connection.query("SELECT * FROM `users`", function (err, results, fields) {
  console.log(results[0].createdAt); // results contains rows returned by server
  // console.log(fields); // fields contains extra meta data about results, if available
});

//================================================================================//

// Set up route
app.get("/", (req, res) => {
  res.render("index.ejs", { isProduction: process.env.IS_PRODUCTION });
});

//================================================================================//

// Initialize port
app.listen(PORT);

// Serve static files (CSS, JS, images, fonts, etc.)
app.use(express.static(path.resolve(__dirname, "public")));

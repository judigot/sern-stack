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
console.log(1);
db.connect();
console.log(2);

// const users = async () => {
//   await User.findAll();
// };
// users.every((data) => {
//   console.log("All users:", JSON.stringify(data, null, 2));
// });
// console.log(users.every((user) => user instanceof User)); // true

//================================================================================//

// Set up route
app.get("/", (req, res) => {
  res.render("index.ejs", { isProduction: process.env.IS_PRODUCTION });
});

// Set up route
app.get("/users", async (req, res) => {
  // get the client
  const mysql = require("mysql2");

  // create the connection to database
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "bigbang",
  });
  let data = [];
  // simple query
  connection.query("SELECT * FROM `users`", function (err, results, fields) {
    data = results;
    console.log(results[0]); // results contains rows returned by server
    // console.log(fields); // fields contains extra meta data about results, if available
  });
  res.send(data);
});

//================================================================================//

// Initialize port
app.listen(PORT);

// Serve static files (CSS, JS, images, fonts, etc.)
app.use(express.static(path.resolve(__dirname, "public")));
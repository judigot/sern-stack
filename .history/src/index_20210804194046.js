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

// const { User } = require("sequelize");
const models = require("./models");
models.findAll()
// Set up route
app.get("/users", async (req, res) => {
  // const mysql = require("mysql2");

  // const connection = mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "bigbang",
  // });

  // connection.query("SELECT * FROM `users`", function (err, results, fields) {
  //   res.send(results);
  // });

  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (error) {}
});

app.get("/users/:id/:type", (req, res) => {
  res.send(req.params);
});

//================================================================================//

// Initialize port
app.listen(PORT);

// Serve static files (CSS, JS, images, fonts, etc.)
app.use(express.static(path.resolve(__dirname, "public")));

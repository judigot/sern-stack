// Require .env file
require("dotenv").config();

// *production environment port may not be 5000, hence the "process.env.PORT"
const PORT = process.env.PORT || 3000;

// Load environment
import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";

// Variables
const app: Application = express();
const viewsFolder: string = `views`;

// Set view engine
app.set("views", path.resolve(__dirname, viewsFolder));
app.set("view engine", "ejs");

//================================================================================//

import Database from "./app/Classes/Database";
const db = new Database();

/*********
 * MYSQL *
 *********/
//================================================================================//
db.connect();
//================================================================================//

// Set up route
app.get("/", (req: Request, res: Response) => {
  res.render("index.ejs", { isProduction: process.env.IS_PRODUCTION });
});
import Models from "./models/user";

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

  // const Models = require("./models");
  

  // Insert Data
  Models.User.create({
    firstName: "Judy",
    lastName: "Igot",
    email: "judigot@gmail.com",
    password: "$2b$10$hi41dPYJv0a6NcnvrUFVqevSI5Ehxzp29yNvAkD.GXfuz98Mlt0wq",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  try {
    const users = await Models.User.findAll();
    return res.json(users);
  } catch (error) {}
});

//================================================================================//

// Initialize port
app.listen(PORT);

// Serve static files (CSS, JS, images, fonts, etc.)
app.use(express.static(path.resolve(__dirname, "public")));

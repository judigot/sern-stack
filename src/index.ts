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

app.use(express.json());

//================================================================================//

import Database from "./app/Classes/Database";
const db = new Database();

/*********
 * MYSQL *
 *********/
//================================================================================//
const data1 = [
  {
    firstName: "first name",
    lastName: "last name",
  },
  {
    firstName: "first name",
    lastName: "last name",
  },
];
const data2 = {
  firstName: "first name",
  lastName: "last name",
};

db.create("users", data1)
  .then((result: any) => {
    // Success
    const insertId = result.insertId;
    const affectedRows = result.affectedRows;
    const serverStatus = result.serverStatus;
  })
  .catch((error: any) => {
    // Fail
    const code = error.code;
    const errno = error.errno;
    const sqlState = error.sqlState;
    const sqlMessage = error.sqlMessage;
  })
  .finally(() => {
    // Run this code wether successful or failed
  });

//================================================================================//

// Set up route
app.get("/", (req: Request, res: Response) => {
  res.render("index.ejs", { isProduction: process.env.IS_PRODUCTION });
});

app.get("/users/:id/:type", (req, res) => {
  res.send(req.params);
});

// Set up route
app.post("/users", (req: Request, res: Response) => {
  console.log(1);
  try {
    const data = req.body;
    db.create("users", data);
    console.log(`Hello, World!`);
  } catch (error) {}
  console.log(2);
});

//================================================================================//

// Initialize port
app.listen(PORT);

// Serve static files (CSS, JS, images, fonts, etc.)
app.use(express.static(path.resolve(__dirname, "public")));

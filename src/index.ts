// Require .env file
require("dotenv").config();

// *production environment port may not be 5000, hence the "process.env.PORT"
const PORT = process.env.PORT || 3000;

// Load environment
import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";
// import favicon from "serve-favicon";
var favicon = require("serve-favicon");

// Variables
const app: Application = express();
const viewsFolder: string = `views`;

// Set view engine
app.set("views", path.resolve(__dirname, viewsFolder));
app.set("view engine", "ejs");

// Set favicon
app.use(favicon(path.join(__dirname, "public", "favicon.png")));

//================================================================================//

import Database from "./app/Classes/Database";
var DB = new Database();

console.log(DB.helloWorld());

// Set up route
app.get("/", (req: Request, res: Response) => {
  res.render("index.ejs", { name: "Hey" });
});

//================================================================================//

// Initialize port
app.listen(PORT);

// Serve static files (CSS, JS, images, fonts, etc.)
app.use(express.static(path.resolve(__dirname, "public")));

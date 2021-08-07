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
const DB = new Database();

//================================================================================//
//================================================================================//

// Set up route
app.get("/", (req: Request, res: Response) => {
  res.render("index.ejs", { isProduction: process.env.IS_PRODUCTION });
});

app.get("/users/:id/:type", (req, res) => {
  res.send(req.params);
});

// Set up route
app.get("/users", (req: Request, res: Response) => {
  DB.read("SELECT * from `users`;").then((result: any) => {
    res.send(result);
  });
});

//================================================================================//

// Initialize port
app.listen(PORT);

// Serve static files (CSS, JS, images, fonts, etc.)
app.use(express.static(path.resolve(__dirname, "public")));

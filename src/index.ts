if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Set up Express
import express, { Application, Request, Response, NextFunction } from "express";

const app: Application = express();
// Variables
// *production environment port may not be 5000, hence the "process.env.PORT"
const PORT = process.env.PORT || 3000;

const path = require("path");
const viewsFolder: string = `views`;

// Set view engine
app.set("views", path.resolve(__dirname, viewsFolder));

app.set("view engine", "ejs");

var Database = require("./app/Classes/Database.ts");
var DB = new Database();

console.log(DB.helloWorld());

app.get("/", (req: Request, res: Response) => {
  res.render("index.ejs", { name: "Hey" });
});

// Initialize port
app.listen(PORT);

// Serve static pages without template engines
// app.use(express.static(path.resolve(__dirname, "public")));

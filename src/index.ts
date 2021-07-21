if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import express from "express";
const app = express();
const port = process.env.PORT || 3000; // Production environment port may not be 5000, hence the "process.env.PORT"
const path = require("path");

// Set view engine
app.set("views", path.resolve(__dirname, `views`));
app.set("view engine", "ejs");

var Database = require("./app/Classes/Database.ts");
var DB = new Database();

console.log(DB.helloWorld());

app.get("/", (req, res) => {
  res.render("index.ejs", { name: "Hey" });
});

// Initialize port
app.listen(port, () => {
  console.log(`Port has started at http://localhost:${port}`);
});

// Serve static pages without template engines
// app.use(express.static(path.resolve(__dirname, "public")));

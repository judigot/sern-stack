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

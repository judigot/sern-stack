// Import .env file
import "dotenv/config";

// *production environment port may not be 5000, hence the "process.env.PORT"
const PORT = process.env.PORT || 3000;

// Load environment
import path from "path";
import express, { Application } from "express";
import cookieParser from "cookie-parser";

// Variables
const app: Application = express();
const viewsFolder: string = `views`;
// 

//==========CORS==========//
// Disable CORS errors; Enable requests from front-end
app.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*"); // Allow all websites to access the server
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Allow only specific sites to access the server
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH");
    return res.status(200).json({});
  }
  //   if (req.method === "POST") {
  //     return res.status(404).json({}); // Send a 404 response to the browser
  //   }
  next();
});
//==========CORS==========//

// Runs every time a route is accessed
// app.use(function (req, res, next) {
//   console.log("Hello, World!");
//   next();
// });

// Set view engine
app.set("views", path.resolve(__dirname, viewsFolder));
app.set("view engine", "ejs");

// Parses incoming requests with JSON
app.use(express.json());

app.use(cookieParser());

// Serve static files (CSS, JS, images, fonts, etc.)
app.use(express.static(path.resolve(__dirname, "public")));

// Parse POST and PUT requests
app.use(express.urlencoded({ extended: true }));

//================================================================================//

//====================ROUTESMASTER====================//
import { PublicRouter, PrivateRouter } from "./routes/RoutesMaster";

import JWTAuthController from "app/Http/Controllers/JWTAuthController";

app.use("/", PublicRouter);

// Add an auth middleware to private routes
app.use("/", JWTAuthController.checkNotAuthenticated, PrivateRouter);
//====================ROUTESMASTER====================//

//================================================================================//
// Initialize port
app.listen(PORT);

console.log(`Express server started at http://localhost:${PORT}`);

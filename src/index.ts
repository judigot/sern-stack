// Import .env file
import dotenv from "dotenv";
dotenv.config();

// *production environment port may not be 5000, hence the "process.env.PORT"
const PORT = process.env.PORT || 3000;

// Load environment
import path from "path";
import express, { Application } from "express";

// Variables
const app: Application = express();
const viewsFolder: string = `views`;

// Set view engine
app.set("views", path.resolve(__dirname, viewsFolder));
app.set("view engine", "ejs");

// Parses incoming requests with JSON
app.use(express.json());

// Serve static files (CSS, JS, images, fonts, etc.)
app.use(express.static(path.resolve(__dirname, "public")));

// Parse POST and PUT requests
app.use(express.urlencoded({ extended: true }));

//================================================================================//
import routes from "./routes/web";

app.use("/", routes);

//================================================================================//
// Initialize port
app.listen(PORT);

console.log(`Server started at port ${PORT}`);

// Import .env file
import dotenv from "dotenv";
dotenv.config();

// *production environment port may not be 5000, hence the "process.env.PORT"
const PORT = process.env.PORT || 3000;

// Load environment
import express, { Application } from "express";
import path from "path";

// Variables
const app: Application = express();
const viewsFolder: string = `views`;

// Set view engine
app.set("views", path.resolve(__dirname, viewsFolder));
app.set("view engine", "ejs");

app.use(express.json());

// Serve static files (CSS, JS, images, fonts, etc.)
app.use(express.static(path.resolve(__dirname, "public")));

//================================================================================//
import routes from "./routes/web";

app.use("/", routes);

// import userRoutes from "./routes/user";
// app.use("/user", userRoutes);

//================================================================================//
// Initialize port
app.listen(PORT);

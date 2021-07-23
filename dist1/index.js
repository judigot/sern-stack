"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Require .env file
require("dotenv").config();
// *production environment port may not be 5000, hence the "process.env.PORT"
var PORT = process.env.PORT || 3000;
console.log(PORT);
// Load environment
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
// Variables
var app = express_1.default();
var viewsFolder = "views";
// Set view engine
app.set("views", path_1.default.resolve(__dirname, viewsFolder));
app.set("view engine", "ejs");
//================================================================================//
var Database_1 = __importDefault(require("./app/Classes/Database"));
var DB = new Database_1.default();
console.log(DB.helloWorld());
// Set up route
app.get("/", function (req, res) {
    res.render("index.ejs", { name: "Hey" });
});
//================================================================================//
// Initialize port
app.listen(PORT);
// Serve static files (CSS, JS, images, fonts, etc.)
app.use(express_1.default.static(path_1.default.resolve(__dirname, "public")));

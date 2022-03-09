"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var PORT = process.env.PORT || 3000;
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var app = (0, express_1.default)();
var viewsFolder = "views";
app.set("views", path_1.default.resolve(__dirname, viewsFolder));
app.set("view engine", "ejs");
app.use(express_1.default.json());
var web_1 = __importDefault(require("./routes/web"));
app.use("/", web_1.default);
app.listen(PORT);
app.use(express_1.default.static(path_1.default.resolve(__dirname, "public")));

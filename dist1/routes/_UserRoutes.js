"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Database_1 = __importDefault(require("Classes/Database"));
exports.default = {
    "/user": {
        view: "home.ejs",
        chunks: [],
        get: function (req, res) {
            Database_1.default.read("SELECT * from `users`;").then(function (result) {
                res.send(result);
            });
        },
    },
    "/user/home": {
        view: "home.ejs",
        chunks: [],
        get: function (req, res) {
            res.render("user/home.ejs", {
                isProduction: process.env.IS_PRODUCTION,
            });
        },
    },
};

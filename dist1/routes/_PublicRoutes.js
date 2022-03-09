"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "/": {
        view: "index",
        chunks: ["vendor", "main"],
        get: function (req, res) {
            res.render("index.ejs", { isProduction: process.env.IS_PRODUCTION });
        },
        post: function () { },
    },
    "/login": {
        view: "index.ejs",
        chunks: ["vendor", "login"],
        get: function (req, res) {
            res.render("user/home.ejs", {
                isProduction: process.env.IS_PRODUCTION,
            });
        },
    },
};

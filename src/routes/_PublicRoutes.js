"use strict";
exports.__esModule = true;
exports["default"] = {
    "/": {
        view: "index",
        chunks: ["vendor", "main"],
        get: function (req, res) {
            res.render("index.ejs", { isProduction: process.env.IS_PRODUCTION });
        },
        post: function () { }
    },
    "/login": {
        view: "index.ejs",
        chunks: ["vendor", "login"],
        get: function (req, res) {
            res.render("login.ejs", {
                isProduction: process.env.IS_PRODUCTION
            });
        }
    }
};

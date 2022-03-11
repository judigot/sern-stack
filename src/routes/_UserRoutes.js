"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.views = void 0;
var Database_1 = require("Classes/Database");
var routes = {
    "/user": {
        view: "home.ejs",
        chunks: [],
        get: function (req, res) {
            Database_1["default"].read("SELECT * from `users`;").then(function (result) {
                res.send(result);
            });
        },
        post: function (req, res) {
            var postData = req.body;
            res.send(postData);
        }
    },
    "/user/home": {
        view: "home.ejs",
        chunks: [],
        get: function (req, res) {
            res.render("user/home.ejs", {
                isProduction: process.env.IS_PRODUCTION
            });
        }
    }
};
exports.views = [];
Object.keys(routes).forEach(function (url, index, array) {
    var _a = routes[url], get = _a.get, post = _a.post, newValues = __rest(_a, ["get", "post"]);
    exports.views[url] = newValues;
});
console.log(exports.views);
exports["default"] = routes;

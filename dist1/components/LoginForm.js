"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginForm = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var LoginForm = function (props) {
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "login-form" }, { children: (0, jsx_runtime_1.jsxs)("form", { children: [(0, jsx_runtime_1.jsx)("label", { children: "Username" }), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "email" }), (0, jsx_runtime_1.jsx)("label", { children: "Password" }), (0, jsx_runtime_1.jsx)("input", { type: "password", name: "password" }), (0, jsx_runtime_1.jsx)("button", __assign({ type: "submit" }, { children: "Login" }))] }) })));
};
exports.LoginForm = LoginForm;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var ParentComponent_1 = require("./ParentComponent");
var Component = function (elementID) {
    react_dom_1.default.render((0, jsx_runtime_1.jsx)(react_1.default.StrictMode, { children: (0, jsx_runtime_1.jsx)(ParentComponent_1.ParentComponent, {}) }), document.getElementById(elementID));
};
exports.Component = Component;

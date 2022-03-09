"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Person_1 = __importDefault(require("Classes/Person"));
var react_1 = require("components/react");
(0, react_1.Component)("root");
var jude = new Person_1.default("Jude", "Francis");
var personName = jude.getFullName();
alert(personName);

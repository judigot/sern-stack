"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _PublicRoutes_1 = __importDefault(require("./_PublicRoutes"));
var _UserRoutes_1 = __importDefault(require("./_UserRoutes"));
var routes = [];
routes["public"] = _PublicRoutes_1.default;
routes["user"] = _UserRoutes_1.default;
routes["globalChunks"] = ["global", "main"];
exports.default = routes;

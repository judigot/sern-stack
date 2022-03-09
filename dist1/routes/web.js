"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var RoutesMaster_1 = __importDefault(require("./RoutesMaster"));
var router = express_1.default.Router();
useRoutes(RoutesMaster_1.default.public);
useRoutes(RoutesMaster_1.default.user);
function useRoutes(routes) {
    Object.keys(routes).forEach(function (url, index, array) {
        var routeDetails = routes[url];
        if ("get" in routeDetails) {
            router.get(url, function (req, res) {
                routes[url].get(req, res);
            });
            console.log("GET route used in \"".concat(url, "\""));
        }
        if ("post" in routeDetails) {
            router.post(url, function (req, res) {
                routes[url].post(req, res);
            });
            console.log("POST route used in route \"".concat(url, "\""));
        }
        if ("put" in routeDetails) {
        }
        if ("delete" in routeDetails) {
        }
        if ("patch" in routeDetails) {
        }
    });
}
exports.default = router;

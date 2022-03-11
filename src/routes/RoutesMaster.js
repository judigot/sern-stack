"use strict";
exports.__esModule = true;
var _PublicRoutes_1 = require("./_PublicRoutes");
var _UserRoutes_1 = require("./_UserRoutes");
var routes = [];
routes["public"] = _PublicRoutes_1["default"];
routes["user"] = _UserRoutes_1["default"];
routes["globalChunks"] = ["global", "main"];
exports["default"] = routes;

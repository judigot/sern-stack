"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var promise_1 = __importDefault(require("mysql2/promise"));
var Database = (function () {
    function Database() {
        Database.testVariable = "Changed value";
        return this;
    }
    Object.defineProperty(Database, "getter", {
        get: function () {
            return this.privateVariable;
        },
        enumerable: false,
        configurable: true
    });
    Database.helloWorld = function () {
        return this.testVariable;
    };
    Database.connect = function () {
        return this.pool;
    };
    Database.disconnect = function () {
        this.pool = null;
    };
    Database.create = function (tableName, data) {
        return __awaiter(this, void 0, void 0, function () {
            var isMultipleRows, columnNames, values, parameters, i, parameter, element, key, parameter, key, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isMultipleRows = Array.isArray(data);
                        columnNames = Object.keys(isMultipleRows ? data[0] : data);
                        values = [];
                        parameters = [];
                        if (isMultipleRows) {
                            for (i = 0; i < data.length; i++) {
                                parameter = [];
                                element = data[i];
                                for (key in element) {
                                    values.push(element[key]);
                                    parameter.push("?");
                                }
                                parameters.push("(".concat(parameter.join(", "), ")"));
                            }
                        }
                        else {
                            parameter = [];
                            for (key in data) {
                                values.push(data[key]);
                                parameter.push("?");
                            }
                            parameters.push("(".concat(parameter.join(", "), ")"));
                        }
                        sql = "INSERT INTO `".concat(tableName, "` (`").concat(columnNames.join("`, `"), "`) VALUES ").concat(parameters.join(", "), ";");
                        return [4, this.execute(sql, values)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Database.read = function (sql, values) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.execute(sql, values)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Database.update = function (tableName, targetColumns, where, inside) {
        return __awaiter(this, void 0, void 0, function () {
            var targetColumnsArray, whereArray, insideArray, values, targetColumnsStatement, whereStatement, insideStatement, isSingleWhereCondition, isWhereConditionArray, isShorthand, key, whereConditionsCount, key, tempArray, value, value, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        targetColumnsArray = [];
                        whereArray = [];
                        insideArray = [];
                        values = [];
                        targetColumnsStatement = "";
                        whereStatement = "";
                        insideStatement = "";
                        isSingleWhereCondition = (where && Object.keys(where).length === 1) ||
                            (inside && Object.keys(inside).length === 1);
                        isWhereConditionArray = (where && typeof where[Object.keys(where)[0]] === "object") ||
                            (inside && typeof inside[Object.keys(inside)[0]] === "object");
                        isShorthand = isSingleWhereCondition && isWhereConditionArray;
                        console.log(isShorthand ? "Shorthand" : "Not shorthand");
                        if (targetColumns) {
                            for (key in targetColumns) {
                                targetColumnsArray.push("`".concat(key, "` = ?"));
                                values.push(targetColumns[key]);
                            }
                            targetColumnsStatement = " SET ".concat(targetColumnsArray.join(", "));
                        }
                        console.log(isShorthand);
                        if ((where && inside) || (where && !isShorthand)) {
                            whereConditionsCount = Object.keys(where).length;
                            console.log("There is a where. Total where statements = ".concat(whereConditionsCount));
                            if (whereConditionsCount > 1) {
                                [where].forEach(function (value, i) {
                                    for (var key in value) {
                                        if (Object.prototype.hasOwnProperty.call(value, key)) {
                                            whereArray.push("`".concat(key, "` = ?"));
                                            values.push(value[key]);
                                        }
                                    }
                                });
                                whereStatement = " WHERE ".concat(whereArray.join(" OR "));
                            }
                            else {
                                console.log("".concat(whereConditionsCount, " where statement"));
                                for (key in where) {
                                    tempArray = [];
                                    value = where[key];
                                    whereArray.push("`".concat(key, "` = ?"));
                                    values.push(where[key]);
                                }
                                whereStatement = " WHERE ".concat(whereArray);
                            }
                        }
                        if (isShorthand) {
                            value = inside
                                ? inside[Object.keys(inside)[0]]
                                : where[Object.keys(where)[0]];
                            insideArray = this.handleInside(value);
                            insideStatement = " ".concat(where && inside ? "OR" : "WHERE", " `").concat(Object.keys(inside || where)[0], "` IN (").concat(insideArray.join(", "), ")");
                            values = values.concat(value);
                        }
                        sql = "UPDATE `".concat(tableName, "`").concat(targetColumnsStatement).concat(whereStatement).concat(insideStatement, ";");
                        console.log(sql);
                        console.log(values);
                        return [4, this.execute(sql, values)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Database.delete = function (tableName, referenceColumn, values) {
        return __awaiter(this, void 0, void 0, function () {
            var reference, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!Array.isArray(values)) {
                            values = [values];
                        }
                        reference = this.handleInside(values).join(", ");
                        sql = "DELETE FROM `".concat(tableName, "` WHERE `").concat(referenceColumn, "` IN (").concat(reference, ");");
                        return [4, this.execute(sql, values)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Database.execute = function (sql, values) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, rows, columns, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.pool.execute(sql, values)];
                    case 1:
                        _a = _b.sent(), rows = _a[0], columns = _a[1];
                        return [2, rows];
                    case 2:
                        error_1 = _b.sent();
                        return [2, error_1];
                    case 3: return [2];
                }
            });
        });
    };
    Database.prototype.duplicate = function (tableName, referenceColumn, referenceValue, incrementColumn, incrementString) { };
    Database.handleInside = function (array) {
        var insideArray = [];
        for (var key in array) {
            insideArray.push("?");
        }
        return insideArray;
    };
    Database.prototype.getCredentials = function () { };
    Database.dump = function () { };
    Database.unionBuilder = function (iterator, tableDetails) { };
    Database.replaceValues = function (string, replacements) {
        var i = 0;
        return string.replace(/\?/g, function () {
            return "'".concat(replacements[i++], "'");
        });
    };
    Database.message = "Hello, Database!";
    Database.connection = {
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    };
    Database.pool = promise_1.default.createPool(Database.connection);
    Database.testVariable = "Original value";
    Database.privateVariable = "This is a private variable.";
    return Database;
}());
exports.default = Database;

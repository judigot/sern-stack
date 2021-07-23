"use strict";
var Database = /** @class */ (function () {
    function Database() {
        this.message = "Hello, World!";
    }
    Database.prototype.helloWorld = function () {
        return this.message;
    };
    return Database;
}());
module.exports = Database;

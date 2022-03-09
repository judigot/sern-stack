'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Model = require('sequelize').Model;
module.exports = function (sequelize, DataTypes) {
    var Post = (function (_super) {
        __extends(Post, _super);
        function Post() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Post.associate = function (models) {
        };
        return Post;
    }(Model));
    ;
    Post.init({
        postName: DataTypes.STRING,
        postOwner: DataTypes.INTEGER
    }, {
        sequelize: sequelize,
        modelName: 'Post',
    });
    return Post;
};

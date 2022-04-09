"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Foreign key
      Post.belongsTo(models.User, {
        foreignKey: {
          name: "postOwner",
        },
      });
    }
  }
  Post.init(
    {
      postName: DataTypes.STRING,
      postOwner: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};

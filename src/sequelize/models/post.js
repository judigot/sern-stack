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

      // Foreign key alternative 1
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

      // Foreign key alternative 2
      // postOwner: {
      //   type: DataTypes.INTEGER,
      //   references: {
      //     model: "app_user",
      //     key: "user_id",
      //   },
      // },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};

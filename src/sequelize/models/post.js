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
      //==========FOREIGN KEY 1==========//
      Post.belongsTo(models.User, {
        foreignKey: {
          name: "postOwner",
        },
      });
      //==========FOREIGN KEY 1==========//
    }
  }
  Post.init(
    {
      postName: DataTypes.STRING,
      postOwner: DataTypes.INTEGER,

      // Foreign key alternative 2
      postOwner: {
        type: DataTypes.INTEGER,
        //==========FOREIGN KEY 2==========//
        // onUpdate: "CASCADE",
        // references: {
        //   model: "app_user",
        //   key: "user_id",
        // },
        //==========FOREIGN KEY 2==========//
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};

import "dotenv/config";

import Sequelize from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
    port: process.env.DB_PORT,
  }
);

// {
//   database: process.env.DB_DATABASE,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   dialect: process.env.DB_CONNECTION,
//   port: process.env.DB_PORT,
// }

const User = sequelize.define("User", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
});

(async () => {
  await sequelize
    .query("SET FOREIGN_KEY_CHECKS = 0")
    .then(function () {
      sequelize
        .sync({
          force: true,
        })
        .then(function () {
          sequelize.query("SET FOREIGN_KEY_CHECKS = 1").then(function () {
            console.log("Database synchronised.");
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch(function (ee) {
      console.log(err);
    });
  // await sequelize.sync({ force: true });
  // Code here
})();
export default User;

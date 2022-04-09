//==========USAGE==========//
// import User from "./src/app/Models/SequelizeModel";
// User.findAll()
//   .then((data: any) => {
//     console.log(data);
//   })
//   .catch((error: any) => {
//     console.log(error);
//   });
//==========USAGE==========//

import "dotenv/config";

import { Sequelize, Dialect, Model, DataTypes } from "sequelize";

const sequelize = new Sequelize({
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: <Dialect | undefined>process.env.DB_CONNECTION,
  port: <number | undefined>process.env.DB_POST,

  // Disable SQL logging in console
  logging: false,
});

const User = sequelize.define("User", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
});

// Only uncomment when you want to update table structure
// (async () => {
//   await sequelize
//     .query("SET FOREIGN_KEY_CHECKS = 0")
//     .then(function () {
//       sequelize
//         .sync({
//           force: true,
//           // alter: true,
//           logging: false,
//         })
//         .then(function () {
//           sequelize.query("SET FOREIGN_KEY_CHECKS = 1").then(function () {
//             console.log("Successfully updated tables.");
//           });
//         })
//         .catch(function (error: any) {
//           console.log(error);
//         });
//     })
//     .catch(function (err: any) {
//       console.log(err);
//     });
// })();

export default User;

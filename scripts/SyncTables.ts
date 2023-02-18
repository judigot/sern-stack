import { exit } from "process";

import Model from "../src/sequelize/models";

Model.sequelize
  .sync({
    force: true,
    // alter: true,
    logging: false,
  })
  .then(function () {
    console.log("Successfully updated table structure.");
    exit();
  })
  .catch(function (error: any) {
    console.log(error);
  });

// Model.sequelize
//   .query("SET FOREIGN_KEY_CHECKS = 0;")
//   .then(function () {
//     // Re-build tables
//     Model.sequelize
//       .sync({
//         force: true,
//         // alter: true,
//         logging: false,
//       })
//       .then(function () {
//         Model.sequelize.query("SET FOREIGN_KEY_CHECKS = 1;").then(function () {
//           console.log("Successfully updated table structure.");
//           exit();
//         });
//       })
//       .catch(function (error: any) {
//         console.log(error);
//       });
//   })
//   .catch((error: any) => {
//     // Failure
//     console.log(error);
//   })
//   .finally(() => {
//     // Finally
//   });

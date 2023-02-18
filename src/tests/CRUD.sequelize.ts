import Model from "../sequelize/models";

import { QueryTypes } from "sequelize";

import SequelizeModel from "../app/Models/SequelizeModel";

// Model.User.create({
//   firstName: "Sequalize",
//   lastName: "Igot",
//   email: "judigot@gmail.com",
//   password: "$2b$10$hi41dPYJv0a6NcnvrUFVqevSI5Ehxzp29yNvAkD.GXfuz98Mlt0wq",
//   createdAt: new Date(),
//   updatedAt: new Date(),
// })
//   .then((result: any) => {
//     console.log(result);
//   })
//   .catch((error: any) => {})
//   .finally(() => {});

// Model.User.bulkCreate([
//   {
//     firstName: "Sequalize111",
//     lastName: "Igot",
//     email: "judigot@gmail.com",
//     password: "$2b$10$hi41dPYJv0a6NcnvrUFVqevSI5Ehxzp29yNvAkD.GXfuz98Mlt0wq",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     firstName: "Sequalize222",
//     lastName: "Igot",
//     email: "judigot@gmail.com",
//     password: "$2b$10$hi41dPYJv0a6NcnvrUFVqevSI5Ehxzp29yNvAkD.GXfuz98Mlt0wq",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ])
//   .then((result: any) => {
//     console.log(result);
//   })
//   .catch((error: any) => {})
//   .finally(() => {});
//

Model.sequelize
  .query("SELECT * FROM `Users` WHERE `id` = ?;", {
    replacements: [1],
    type: QueryTypes.SELECT,
  })
  .then((result: any) => {
    // Success
    console.log(result);
  })
  .catch((error: any) => {
    // Failure
    throw new Error(error);
  })
  .finally(() => {
    // Finally
  });

Model.sequelize
  .query("SELECT * FROM `Users` WHERE `id` IN (:ids);", {
    replacements: { ids: [1] },
    type: QueryTypes.SELECT,
  })
  .then((result: any) => {
    // Success
    console.log(result);
  })
  .catch((error: any) => {
    // Failure
    throw new Error(error);
  })
  .finally(() => {
    // Finally
  });

// Model.User.findAll()
//   .then((result: any) => {
//     for (let i = 0; i < result.length; i++) {
//       const row = result[i];
//       console.log(row.dataValues);
//     }
//   })
//   .catch((error: any) => {})
//   .finally(() => {});

// SequelizeModel.findAll()
//   .then((result: any) => {
//     for (let i = 0; i < result.length; i++) {
//       const row = result[i];
//       console.log(row.dataValues);
//     }
//   })
//   .catch((error: any) => {})
//   .finally(() => {});

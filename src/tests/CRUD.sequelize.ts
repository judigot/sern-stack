import Model from "../sequelize/models";

import User from "../app/Models/SequelizeModel";

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
Model.User.findAll()
  .then((result: any) => {
    for (let i = 0; i < result.length; i++) {
      const row = result[i];
      console.log(row.dataValues);
    }
  })
  .catch((error: any) => {})
  .finally(() => {});

User.findAll()
  .then((result: any) => {
    for (let i = 0; i < result.length; i++) {
      const row = result[i];
      console.log(row.dataValues);
    }
  })
  .catch((error: any) => {})
  .finally(() => {});

import "tsconfig-paths/register"; // Parse path aliases

import DB from "Classes/Postgres";

DB.raw(`CREATE DATABASE bigbang;`, [])
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    // Finally
  });

// DB.read("SELECT * FROM `users`;")
//   .then((value) => {
//     console.log(value);
//   })
//   .catch((error) => {
//     console.log(error);
//   })
//   .finally(() => {
//     // Finally
//   });

// User.all().then((result: { [key: string]: string }[]) => {
//   console.log(result);
// });

// User.create({
//   firstName: "Jude",
//   lastName: "Igot",
//   email: "judigot@gmail.com",
//   password: "hash",
//   createdAt: new Date(),
//   updatedAt: new Date(),
// }).then(async (result) => {
//   console.log(result);
// });

// User.update({ lastName: "00000" }).then((result) => {
//   console.log(result);
// });

// User.delete("id", [3, 4]).then((result) => {
//   console.log(result);
// });

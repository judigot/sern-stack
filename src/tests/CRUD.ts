import DB from "../app/Classes/Database";

import Auth from "../app/Http/Controllers/AuthenticationController";

// Re-seed data before running CRUD test

DB.read("SELECT * from `Users`;").then((result: any) => {
  console.log(result);
});

// Auth.hashPassword("123").then((hash) => {
//   DB.create("users", {
//     firstName: "Jude",
//     lastName: "Igot",
//     email: "judigot@gmail.com",
//     password: hash,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   }).then(async (result) => {
//     console.log(result);
//   });
// });

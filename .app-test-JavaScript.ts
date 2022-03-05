import DB from "./src/app/Classes/Database";

import Auth from "./src/app/Http/Controllers/AuthenticationController";

// const Models = require("./src-js/models");

// Models.User.create({
//   firstName: "Judy",
//   lastName: "Igot",
//   email: "judigot@gmail.com",
//   password: "$2b$10$hi41dPYJv0a6NcnvrUFVqevSI5Ehxzp29yNvAkD.GXfuz98Mlt0wq",
//   createdAt: new Date(),
//   updatedAt: new Date(),
// });

// Auth.hashPassword("123").then((hash) => {
//   DB.create("users", {
//     firstName: "Judy Gwapo",
//     lastName: "Igot",
//     email: "judigot@gmail.com",
//     password: hash,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   }).then(console.log);
// });

// DB.update("users", { lastName: "hahay" }, { id: [1, 2, 3, 4] });

// DB.read("select * from users where id = 1").then(console.log);

// console.log(DB.helloWorld());
// console.log(DB.getter);

// console.log(new DB());
// new DB();

DB.read("SELECT * FROM `users`").then((result) => {
  console.log(result);
});

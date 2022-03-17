import DB from "./src/app/Classes/Database";

import Auth from "./src/app/Http/Controllers/AuthenticationController";

// import DB from "./src/routes/RoutesMaster";
// console.log(DB);

import Models from "./src/models";

console.log(Models.User);


// Models.User.create({
//   firstName: "Judy",
//   lastName: "Igot",
//   email: "judigot@gmail.com",
//   password: "$2b$10$hi41dPYJv0a6NcnvrUFVqevSI5Ehxzp29yNvAkD.GXfuz98Mlt0wq",
//   createdAt: new Date(),
//   updatedAt: new Date(),
// });

// DB.update("users", { lastName: "hahay" }, { id: [1, 2, 3, 4] });

// DB.read("select * from users where id = 1").then(console.log);

// console.log(DB.helloWorld());
// console.log(DB.getter);

// console.log(new DB());
// new DB();

// Auth.hashPassword("123").then((hash) => {
//   DB.create("users", {
//     firstName: "Gorio",
//     lastName: "Igot",
//     email: "judigot@gmail.com",
//     password: hash,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   }).then((result) => {
//     console.log(result);
//   });
//   DB.create("users", [
//     {
//       firstName: "Gorio",
//       lastName: "Igot",
//       email: "judigot@gmail.com",
//       password: hash,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//     {
//       firstName: "Judy Gwapo",
//       lastName: "Igot",
//       email: "judigot@gmail.com",
//       password: hash,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//   ]).then((result) => {
//     console.log(result);
//   });
// });

//================================================================================//
// DB.update("users", { lastName: "00000" }).then(() => {
//   DB.update("users", { lastName: "11111" }, { id: 1 }).then(() => {
//     DB.update("users", { lastName: "22222" }, undefined, { id: [2, 3] }).then(
//       () => {
//         DB.update("users", { lastName: "33333" }, { id: [4, 5] }).then(() => {
//           DB.update(
//             "users",
//             { lastName: "44444" },
//             { id: 6 },
//             { id: [7, 8] }
//           ).then(() => {
//             DB.update(
//               "users",
//               { lastName: "55555", email: "Success" },
//               { id: 9 },
//               { id: [10] }
//             ).then(() => {
//               // Multiple where statements
//               DB.update(
//                 "users",
//                 { email: "Success" },
//                 { id: 1, firstName: "Judyboy" },
//                 { id: [3, 4] }
//               );
//             });
//           });
//         });
//       }
//     );
//   });
// });

// DB.read("SELECT `firstName` FROM `users` WHERE `id` = ?;", [1]).then(
//   (result) => {
//     // console.log(result);
//   }
// );

// DB.update("users", { lastName: "Reid" }, { id: 1 });

// DB.delete("users", "id", [3, 4]).then((result) => {
//   console.log(result);
// });

// DB.delete("users", "id", 5).then((result) => {
//   console.log(result);
// });

// DB.delete("users", "id", "6").then((result) => {
//   console.log(result);
// });

// DB.update(
//   "users",
//   {
//     firstName: "xxxxxxxx",
//     lastName: "XXX",
//   },
//   { id: 1 }
// );

// function update(
//     {
//         table: "users",
//         columns: {
//             age: "4",
//             firstName: "Jude",
//         }
// where: {
//   id: [123];
// }
//     }
// ) {}

// DB.update("users", { lastName: "11111" }, { id: 1 });

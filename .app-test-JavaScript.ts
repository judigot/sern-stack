import DB from "./src/app/Classes/Database";

import Auth from "./src/app/Http/Controllers/AuthenticationController";

// Auth.hashPassword("123").then((hash) => {
//   DB.create("users", {
//     firstName: "Judy Santa Maria",
//     lastName: "Igot",
//     email: "judigot@gmail.com",
//     password: hash,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   }).then(console.log);
// });

// const db = new DB();

// console.log(db.);

// DB.testerFunction();

// console.log(new DB());

DB.read("select * from users", [1]).then(console.log);

// console.log(DB.helloWorld());

// DB.delete("users", "id", [1]);

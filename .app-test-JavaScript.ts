import DB from "./src/app/Classes/Database";

import Auth from "./src/app/Http/Controllers/AuthenticationController";

Auth.hashPassword("123").then((hash) => {
  DB.create("users", {
    firstName: "Judy Santa Maria",
    lastName: "Igot",
    email: "judigot@gmail.com",
    password: hash,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).then(console.log);
});

// DB.read("select * from users where id = 1").then(console.log);

// console.log(DB.helloWorld());
// console.log(DB.getter);

// console.log(new DB());
// new DB();

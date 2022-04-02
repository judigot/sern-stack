import "tsconfig-paths/register"; // Parse path aliases

import User from "Models/User";

User.all().then((result: { [key: string]: string }[]) => {
  console.log(result);
});

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

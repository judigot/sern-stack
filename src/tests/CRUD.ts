import "tsconfig-paths/register"; // Parse path aliases

import User from "Models/User";

User.create({
  firstName: "Jude",
  lastName: "Igot",
  email: "judigot@gmail.com",
  password: "hash",
  createdAt: new Date(),
  updatedAt: new Date(),
}).then(async (result) => {
  console.log(result);
});

User.create([
  {
    firstName: "Jude",
    lastName: "Igot",
    email: "judigot@gmail.com",
    password: "hash",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    firstName: "Francis",
    lastName: "Igot",
    email: "judigot@gmail.com",
    password: "hash",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
])
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    // Finally
  });

User.all().then((result: { [key: string]: string }[]) => {
  console.log(result);
});

User.read("SELECT * FROM `Users`;")
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    // Finally
  });

User.update({ lastName: "00000" }).then((result) => {
  console.log(result);
});

User.delete("id", [3, 4]).then((result) => {
  console.log(result);
});

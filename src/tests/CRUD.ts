import "tsconfig-paths/register"; // Parse path aliases

import crypto from "crypto";

import User from "Models/User";

// const argLen = ["1", "2", "3"].length;
// const placeHolders = Array(argLen).fill("?");

// Insert a single row
User.create({
  firstName: "Jude",
  lastName: "Igot",
  email: `judigot-${crypto.randomUUID()}@gmail.com`,
  password: "hash",
  createdAt: new Date(),
  updatedAt: new Date(),
}).then((result) => {
  console.log(result);
});

// Insert multiple rows
User.create([
  {
    firstName: "Jude",
    lastName: "Igot",
    email: `judigot-${crypto.randomUUID()}@gmail.com`,
    password: "hash",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    firstName: "Francis",
    lastName: "Igot",
    email: `judigot-${crypto.randomUUID()}@gmail.com`,
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

User.read(`SELECT * FROM "Users";`)
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
User.update({ lastName: "newValue" }, { id: 1 }).then((result) => {
  console.log(result);
});
User.update({ lastName: "xxxxxxxxxxx" }, undefined, {
  id: 1,
}).then((result) => {
  console.log(result);
});

User.delete("id", [37]).then((result) => {
  console.log(result);
});

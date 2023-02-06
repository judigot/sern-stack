import { PrismaClient } from "@prisma/client";

import crypto from "crypto";

const prisma = new PrismaClient();

const Users = prisma.users;

// Run npx prisma generate to use/access prisma models

// Users.create({
//   data: {
//     firstName: "Jude Francis",
//     lastName: "Igot",
//     email: `judigot-${crypto.randomUUID()}@gmail.com`,
//     password: "$2b$10$hi41dPYJv0a6NcnvrUFVqevSI5Ehxzp29yNvAkD.GXfuz98Mlt0wq",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// })
//   .then((result: any) => {
//     // Success
//     const lastInsertedID = result.id;

//     console.log(result);
//   })
//   .catch((error: string) => {
//     // Failure
//     console.log(error);
//   })
//   .finally(() => {
//     // Finally
//   });

//=====READ=====//
// const tableName = "Users";
// const result = prisma.$queryRawUnsafe(
//   `SELECT * FROM ${tableName} WHERE email = ?;`,
//   "judigot@gmail.com"
// );
// result
//   .then((result) => {
//     // Success
//     console.log(result);
//   })
//   .catch((error) => {
//     // Failure
//     console.log(error);
//   })
//   .finally(() => {
//     // Finally
//   });
//=====READ=====//

Users.findMany()
  .then((result: any) => {
    // Success
    console.log(result);
  })
  .catch((error: string) => {
    // Failure
    console.log(error);
  })
  .finally(() => {
    // Finally
  });

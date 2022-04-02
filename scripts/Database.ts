import "tsconfig-paths/register"; // Parse path aliases

import "dotenv/config";

import DB from "Classes/Database";

import { exit } from "process";

const action: string | undefined = "" || process.env.ACTION; // Default is an empty string. If set, this will override the database name in the .env file

const database: string | undefined = "" || process.env.DB_DATABASE; // Default is an empty string. If set, this will override the database name in the .env file

let message = "";

if (action === "create") {
  message = "created";
}
if (action === "drop") {
  message = "dropped";
}
if (action === "reset") {
  message = "reset";
}

let sql = "";

switch (action) {
  case "create":
    sql = `CREATE DATABASE IF NOT EXISTS \`${database}\` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;`;
    break;

  default:
    // Case for "drop" and "reset"
    sql = `DROP DATABASE IF EXISTS \`${database}\`;`;
    break;
}

DB.raw(sql, [])
  .then((result) => {
    if (action === "reset") {
      sql = `CREATE DATABASE IF NOT EXISTS \`${database}\` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;`;

      DB.raw(sql, [])
        .then((result) => {
          console.log(`Database ${database} was successfully ${message}.`);

          // Exit after resetting database
          exit();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log(`Database ${database} was successfully ${message}.`);

      // Exit after creating or dropping database
      exit();
    }
  })
  .catch((error) => {
    console.log(error);
  });

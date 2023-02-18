import "tsconfig-paths/register"; // Parse path aliases

import "dotenv/config";

import DB from "../src/app/Modules/Database";

import { exit } from "process";

const DBType: string | undefined = process.env.DB_CONNECTION;

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
    sql = `CREATE DATABASE ${database} ${
      DBType === "mysql"
        ? "DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;"
        : "ENCODING 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';"
    }`;
    break;

  default:
    // Case for "drop" and "reset"
    sql = `DROP DATABASE IF EXISTS ${database};`;
    break;
}

DB.raw(sql, [])
  .then((result: any) => {
    if (result) {
      console.log(result);
    }
    if (action === "reset") {
      sql = `CREATE DATABASE ${database};`;

      DB.raw(sql, [])
        .then((result: any) => {
          console.log(`Database ${database} was successfully ${message}.`);

          // Exit after resetting database
          exit();
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      console.log(`Database ${database} was successfully ${message}.`);

      // Exit after creating or dropping database
      exit();
    }
  })
  .catch((error: any) => {
    console.log(error);
  });

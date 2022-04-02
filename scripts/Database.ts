import "tsconfig-paths/register"; // Parse path aliases

import "dotenv/config";

import mysql from "../src/app/Classes/Database";
import postgres from "../src/app/Classes/Postgres";

import { exit } from "process";

const DB: any = process.env.DB_CONNECTION === "mysql" ? mysql : postgres;

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
    sql = `CREATE DATABASE ${database};`;
    break;

  default:
    // Case for "drop" and "reset"
    sql = `DROP DATABASE IF EXISTS ${database};`;
    break;
}

DB.raw(sql, [])
  .then((result: any) => {
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

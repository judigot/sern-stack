import "tsconfig-paths/register"; // Parse path aliases

import "dotenv/config";

import DB from "mysql2";
import Database from "Classes/Database";

import { exit } from "process";

const database: string = ""; // Default is an empty string. If set, this will override the database name in the .env file
console.log(`Action: ${process.env.ACTION}`);

let sql = "";

switch (process.env.ACTION) {
  case "create":
    sql = `CREATE DATABASE IF NOT EXISTS \`${
      database || process.env.DB_DATABASE
    }\` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;`;
    break;

  case "drop":
    sql = `DROP DATABASE IF EXISTS \`${database || process.env.DB_DATABASE}\`;`;

    break;

  case "reset":
    sql = `DROP DATABASE IF EXISTS \`${database || process.env.DB_DATABASE}\`;`;

    sql += `CREATE DATABASE IF NOT EXISTS \`${
      database || process.env.DB_DATABASE
    }\` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;`;
    break;

  default:
    break;
}

// console.log(sql);

// sql = "SELECT * FROM `users`;";
// Database.raw(sql, [])
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   })
//   .finally(() => {
//     exit();
//   });

// try {
//   const connection = DB.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//   });

//   let sql = "";

//   if (process.env.ACTION === "create") {
//     sql = `CREATE DATABASE IF NOT EXISTS \`${
//       database || process.env.DB_DATABASE
//     }\` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;`;
//     connection.execute(sql, (error: any, result: any) => {
//       if (error) throw error;
//       console.log(
//         `Database "${database || process.env.DB_DATABASE}" was successfully ${
//           process.env.ACTION === "create" ? "created" : "dropped"
//         }.`
//       );
//       exit();
//     });
//   }

//   if (process.env.ACTION === "drop") {
//     sql = `DROP DATABASE IF EXISTS \`${database || process.env.DB_DATABASE}\`;`;
//     connection.execute(sql, (error: any, result: any) => {
//       if (error) throw error;
//       console.log(
//         `Database "${database || process.env.DB_DATABASE}" was successfully ${
//           process.env.ACTION === "create" ? "created" : "dropped"
//         }.`
//       );
//       exit();
//     });
//   }

//   if (process.env.ACTION === "reset") {
//     sql = `DROP DATABASE IF EXISTS \`${database || process.env.DB_DATABASE}\`;`;

//     // sql = "DROP DATABASE IF EXISTS `bigbang`; CREATE DATABASE IF NOT EXISTS `bigbang` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;";
//     connection.execute(sql, (error: any, result: any) => {
//       if (error) throw error;
//       sql = `CREATE DATABASE IF NOT EXISTS \`${
//         database || process.env.DB_DATABASE
//       }\` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;`;

//       connection.execute(sql, (error: any, result: any) => {
//         if (error) throw error;
//         console.log(
//           `Database "${
//             database || process.env.DB_DATABASE
//           }" was successfully reset.`
//         );
//         exit();
//       });
//     });
//   }
// } catch (error) {
//   console.log(error);
//   exit();
// }

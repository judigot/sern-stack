import dotenv from "dotenv";
dotenv.config();

import DB from "mysql2";

const database: string = ""; // Default is an empty string. If set, this will override the database name in the .env file

try {
  const connection = DB.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  });
  connection.execute(
    `CREATE DATABASE IF NOT EXISTS \`${
      database || process.env.DB_DATABASE
    }\` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;`,
    (error: any, result: any) => {
      if (error) throw error;
      console.log(
        `Database "${
          database || process.env.DB_DATABASE
        }" was successfully created.`
      );
    }
  );
} catch (error) {
  console.log(error);
}

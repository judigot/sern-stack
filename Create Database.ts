import dotenv from "dotenv";
dotenv.config();

import DB from "mysql2";

const connection = DB.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

connection.connect(function (error: any) {
  if (error) throw error;

  connection.execute(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE}\` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;`,
    (error: any, result: any) => {
      if (error) throw error;
      console.log(
        `Database "${process.env.DB_DATABASE}" was successfully created.`
      );
    }
  );
});

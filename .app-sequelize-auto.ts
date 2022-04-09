import "dotenv/config";
const SequelizeAuto = require("sequelize-auto");

const auto = new SequelizeAuto(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
    directory: "./src/sequelize/models", // where to write files
    port: process.env.DB_PORT,
    caseModel: "c", // convert snake_case column names to camelCase field names: user_id -> userId
    caseFile: "c", // file names created for each model use camelCase.js not snake_case.js
    singularize: true, // convert plural table names to singular model names
    additional: {
      timestamps: true,
      // ...options added to each model
    },
    // tables: ["Users", "Posts"], // use all tables, if omitted
  }
);

auto.run().then((data: any) => {
  console.log(data.tables); // table and field list
  console.log(data.foreignKeys); // table foreign key list
  console.log(data.indexes); // table indexes
  console.log(data.hasTriggerTables); // tables that have triggers
  console.log(data.relations); // relationships between models
  console.log(data.text); // text of generated models
});

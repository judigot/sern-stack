require("dotenv").config();

import DB from "mysql2/promise";
import DB2 from "mysql2";

class Database {
  private message: any = "Hello, World!";

  constructor() {}

  public helloWorld() {
    return this.message;
  }

  public async create(tableName: any, data: any) {
    const isMultipleRows = Array.isArray(data);
    const columnNames: string[] = Object.keys(isMultipleRows ? data[0] : data);
    const values: any[] = [];

    // Store values inside an array
    if (isMultipleRows) {
      for (let i = 0; i < data.length; i++) {
        const row: any[] = [];
        const element = data[i];

        for (let key in element) {
          row.push(element[key]);
        }
        values.push(row);
      }
    } else {
      for (let key in data) {
        values.push(data[key]);
      }
    }

    // Build query
    const sql = `INSERT INTO \`${tableName}\` (\`${columnNames.join(
      "`, `"
    )}\`) VALUES ${isMultipleRows ? "?" : "(?)"};`;

    // Use either of the 2 options (async/await or promise)
    const isAsync = true;

    if (isAsync) {
      // Option 1
      const connection = await this.connect();
      const [rows] = await connection.query(sql, [values]);
      await connection.end();
      return [rows];
    } else {
      // Option 2
      const connection = DB2.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        database: process.env.DB_DATABASE,
      });

      return new Promise((resolve, reject) => {
        connection.query(sql, [values], (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(error);
          }
        });
      });
    }

    /**************
     * SAMPLE USE *
     **************/
    /*
      const data1 = [
        {
          firstName: "first name",
          lastName: "last name",
        },
        {
          firstName: "first name",
          lastName: "last name",
        },
      ];
      const data2 = {
        firstName: "first name",
        lastName: "last name",
      };

      db.create("users", data1)
        .then((result: any) => {
          // Success
          const insertId = result.insertId;
          const affectedRows = result.affectedRows;
          const serverStatus = result.serverStatus;
        })
        .catch((error: any) => {
          // Fail
          const code = error.code;
          const errno = error.errno;
          const sqlState = error.sqlState;
          const sqlMessage = error.sqlMessage;
        })
        .finally(() => {
          // Run this code wether successful or failed
        });
    */
  }

  public read(sql: any) {}

  public update(
    tableName: any,
    targetColumn: any,
    newValue: any,
    referenceColumn: any,
    referenceValue: any
  ) {}

  public delete(tableName: any, referenceColumn: any, referenceValue: any) {}

  public execute(sql: any) {}

  public duplicate(
    tableName: any,
    referenceColumn: any,
    referenceValue: any,
    incrementColumn: any,
    incrementString: any
  ) {}

  public getCredentials() {}

  public connect() {
    return DB.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      database: process.env.DB_DATABASE,
    });
  }

  public disconnect(connection: any) {
    connection = null;
  }

  public dump() {}

  public unionBuilder(iterator: any, tableDetails: any) {}
}

export default Database;

// Importing dotenv here is optional if you've already imported it in the main server file e.g. index.js
import "dotenv/config";

import DB from "mysql2/promise";

interface Connection {
  host: string | undefined;
  database: string | undefined;
  user: string | undefined;
  password: string | undefined;
  port: number | undefined;
  waitForConnections: boolean | undefined;
  connectionLimit: number | undefined;
  queueLimit: number | undefined;
}

class Database {
  // Static means that it can be accessed my the class' functions
  // Static functions means that it can be accessed without instantiating the class; Commonly used in utility functions

  static table: string | undefined = ""; // This value will be overridden by models

  private static message: string = "Hello, Database!";

  private static connection: Connection = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: <number>(<unknown>process.env.DB_PORT),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };

  private static pool: any = DB.createPool(Database.connection);

  private static testVariable: string = "Original value";

  constructor(model?: string) {
    Database.testVariable = "Changed value";
    Database.table = model;
    return this;
  }

  private static privateVariable = "This is a private variable.";

  public static get getter() {
    return this.privateVariable;
  }

  public static helloWorld() {
    return this.testVariable;
  }

  public static connect() {
    return this.pool;
  }

  public static disconnect() {
    this.pool.end();
  }

  public static async create(data: any) {
    const isMultipleRows = Array.isArray(data);
    const columnNames: string[] = Object.keys(isMultipleRows ? data[0] : data);
    const values: string[] = [];
    const parameters: string[] = [];

    // Store values and parameters inside arrays
    if (isMultipleRows) {
      for (let i = 0; i < data.length; i++) {
        const parameter: string[] = [];
        const element = data[i];
        for (let key in element) {
          values.push(element[key]);
          parameter.push("?");
        }
        parameters.push(`(${parameter.join(", ")})`);
      }
    } else {
      const parameter: string[] = [];
      for (let key in data) {
        values.push(data[key]);
        parameter.push("?");
      }
      parameters.push(`(${parameter.join(", ")})`);
    }

    // Build query
    const sql: string = `INSERT INTO \`${this.table}\` (\`${columnNames.join(
      "`, `"
    )}\`) VALUES ${parameters.join(", ")};`;

    return await this.execute(sql, values);

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

      User.create(data1)
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

  public static async read<T>(sql: string, values?: T[]) {
    return await this.execute(sql, values);
  }

  public static async update(targetColumns?: any, where?: any, inside?: any) {
    let targetColumnsArray: any[] = [];
    let whereArray: any[] = [];
    let insideArray: any[] = [];
    let values: any[] = [];

    let targetColumnsStatement: string = "";
    let whereStatement: string = "";
    let insideStatement: string = "";

    const isSingleWhereCondition =
      (where && Object.keys(where).length === 1) ||
      (inside && Object.keys(inside).length === 1);

    // console.log(
    //   isSingleWhereCondition
    //     ? `isSingleWhereCondition = true`
    //     : "isSingleWhereCondition = false"
    // );

    const isWhereConditionArray =
      (where && typeof where[Object.keys(where)[0]] === "object") ||
      (inside && typeof inside[Object.keys(inside)[0]] === "object");

    // console.log(
    //   isWhereConditionArray
    //     ? `isWhereConditionArray = true`
    //     : "isWhereConditionArray = false"
    // );

    const isShorthand = isSingleWhereCondition && isWhereConditionArray;

    // console.log(isShorthand ? "Shorthand" : "Not shorthand");

    if (targetColumns) {
      for (let key in targetColumns) {
        targetColumnsArray.push(`\`${key}\` = ?`);
        values.push(targetColumns[key]);
      }

      targetColumnsStatement = ` SET ${targetColumnsArray.join(", ")}`;
    }

    // console.log(isShorthand);

    // Check if there is a where condition
    if ((where && inside) || (where && !isShorthand)) {
      // if ((where || isShorthand) && !isShorthand && !inside) {
      const whereConditionsCount = Object.keys(where).length;
      // console.log(
      //   `There is a where. Total where statements = ${whereConditionsCount}`
      // );

      // If there are multiple where conditions
      if (whereConditionsCount > 1) {
        // console.log(`${whereConditionsCount} where statements`);
        [where].forEach((value: any, i: any) => {
          for (const key in value) {
            if (Object.prototype.hasOwnProperty.call(value, key)) {
              whereArray.push(`\`${key}\` = ?`);
              values.push(value[key]);
            }
          }
        });
        whereStatement = ` WHERE ${whereArray.join(" OR ")}`;
      } else {
        // console.log(`${whereConditionsCount} where statement`);

        for (let key in where) {
          let tempArray: any[] = [];
          const value = where[key];
          whereArray.push(`\`${key}\` = ?`);
          values.push(where[key]);
          // }
        }
        whereStatement = ` WHERE ${whereArray}`;
      }
    }

    if (isShorthand) {
      const value = inside
        ? inside[Object.keys(inside)[0]]
        : where[Object.keys(where)[0]];
      insideArray = this.handleInside(value);

      insideStatement = ` ${where && inside ? "OR" : "WHERE"} \`${
        Object.keys(inside || where)[0]
      }\` IN (${insideArray.join(", ")})`;

      values = values.concat(value);
    }
    const sql = `UPDATE \`${this.table}\`${targetColumnsStatement}${whereStatement}${insideStatement};`;
    // console.log(sql);
    // console.log(values);
    return await this.execute(sql, values);

    /**********
     * TESTER *
     **********/
    // User.update({ lastName: "00000" });
    // User.update({ lastName: "11111" }, { id: 1 });
    // User.update({ lastName: "22222" }, undefined, { id: [1, 2, 3, 4] });
    // User.update({ lastName: "33333" }, { id: [1, 2, 3, 4] });
    // User.update({ lastName: "44444" }, { id: 1 }, { id: [2, 3, 4] });
    // User.update({ lastName: "55555" }, { firstName: "Jude Francis" }, { id: [2, 3, 4] });
  }

  public static async delete(referenceColumn: any, values: any) {
    // If reference value is not an array, convert it to one
    if (!Array.isArray(values)) {
      values = [values];
    }
    const reference = this.handleInside(values).join(", ");
    const sql = `DELETE FROM \`${this.table}\` WHERE \`${referenceColumn}\` IN (${reference});`;
    return await this.execute(sql, values);
  }

  public static async raw(sql: any, values: any) {
    delete this.connection.database;

    const pool: any = DB.createPool(this.connection);

    try {
      const [rows, columns] = await pool.execute(sql, values);
      return rows;
    } catch (error) {
      return error;
    }
  }

  public static async execute(sql: any, values: any) {
    try {
      const [rows, columns] = await this.pool.execute(sql, values);
      return rows;
    } catch (error) {
      return error;
    }
  }

  public duplicate(
    referenceColumn: any,
    referenceValue: any,
    incrementColumn: any,
    incrementString: any
  ) {}

  private static handleInside(array: any) {
    const insideArray: any[] = [];
    for (let key in array) {
      insideArray.push("?");
    }
    return insideArray;
  }

  public getCredentials() {}

  private static dump() {}

  public static unionBuilder(iterator: any, tableDetails: any) {}

  private static replaceValues(string: string, replacements: any) {
    let i = 0;
    return string.replace(/\?/g, () => {
      return `'${replacements[i++]}'`;
    });
  }
}

export default Database;

import dotenv from "dotenv";
dotenv.config();

import DB from "mysql2/promise";

const connection = {
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

class Database {
  private static pool: any = DB.createPool(connection);
  private static private: string = "Secret";

  constructor() {
    return this;
  }
  public static getter() {
    return this.pool;
  }

  public static connect() {
    return this.pool;
  }

  public static disconnect() {
    this.pool = null;
  }

  public static async read(sql: string, values?: any) {
    try {
      const [rows, columns] = await this.pool.execute(sql, values);
      return rows;
    } catch (error) {
      return error;
    }
  }

  public static async update(
    tableName: any,
    targetColumns?: any,
    where?: any,
    inside?: any
  ) {
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

    console.log(isShorthand ? "Shorthand" : "Not shorthand");

    if (targetColumns) {
      for (let key in targetColumns) {
        targetColumnsArray.push(`\`${key}\` = ?`);
        values.push(targetColumns[key]);
      }

      targetColumnsStatement = ` SET ${targetColumnsArray.join(", ")}`;
    }

    console.log(isShorthand);

    // Check if there is a where condition
    if ((where && inside) || (where && !isShorthand)) {
      // if ((where || isShorthand) && !isShorthand && !inside) {
      const whereConditionsCount = Object.keys(where).length;
      console.log(
        `There is a where. Total where statements = ${whereConditionsCount}`
      );

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
        console.log(`${whereConditionsCount} where statement`);

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
      // console.log("There is an inside.");
      const value = inside
        ? inside[Object.keys(inside)[0]]
        : where[Object.keys(where)[0]];
      insideArray = this.handleInside(value);

      insideStatement = ` ${where && inside ? "OR" : "WHERE"} \`${
        Object.keys(inside || where)[0]
      }\` IN (${insideArray.join(", ")})`;

      values = values.concat(value);
    }

    const sql = `UPDATE \`${tableName}\`${targetColumnsStatement}${whereStatement}${insideStatement};`;

    console.log(sql);
    console.log(values);

    try {
      const connection = await this.connect();
      const [rows] = await connection.execute(sql, values);
      await connection.end();
      return rows;
    } catch (error) {
      return error;
    }

    /**********
     * TESTER *
     **********/
    // DB.update("users", { lastName: "00000" });
    // DB.update("users", { lastName: "11111" }, { id: 1 });
    // DB.update("users", { lastName: "22222" }, undefined, { id: [1, 2, 3, 4] });
    // DB.update("users", { lastName: "33333" }, { id: [1, 2, 3, 4] });
    // DB.update("users", { lastName: "44444" }, { id: 1 }, { id: [2, 3, 4] });
    // DB.update("users", { lastName: "55555" }, { firstName: "Jude Francis" }, { id: [2, 3, 4] });
  }

  public static async delete(
    tableName: any,
    referenceColumn: any,
    values: any
  ) {
    const reference = Array.isArray(values)
      ? this.handleInside(values)
      : values;

    const sql = `DELETE FROM \`${tableName}\` WHERE \`${referenceColumn}\` IN (${reference.join(
      ", "
    )});`;

    console.log(this.replaceValues(sql, values));
    console.log(values);

    try {
      const connection = await this.connect();
      const [rows] = await connection.execute(sql, values);
      await connection.end();
      return rows;
    } catch (error) {
      return error;
    }
  }

  public static execute(sql: any) {}

  public duplicate(
    tableName: any,
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
      return replacements[i++];
    });
  }
}

export default Database;

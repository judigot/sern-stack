import { Sequelize } from "sequelize";

class Database {
  private message: any = "Hello, World!";

  constructor() {}

  public helloWorld() {
    return this.message;
  }

  public create(tableName: any, columnNames: any, data: any) {}

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

  public async connect() {
    const sequelize = new Sequelize("appjudigot", "root", "", {
      host: "localhost",
      dialect: `mysql`,
    });
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
      return true;
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      return true;
    }
  }

  public disconnect(connection: any) {
    connection = null;
  }

  public dump() {}

  public unionBuilder(iterator: any, tableDetails: any) {}
}

export default Database;

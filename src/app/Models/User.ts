// Importing dotenv here is optional if you've already imported it in the main server file e.g. index.js
import "dotenv/config";

import DB from "Classes/Database";

class User extends DB {
  static table: string | undefined = `Users`;

  static all() {
    return super.read(`SELECT * FROM ${this.table}`, []);
  }
}

export default User;

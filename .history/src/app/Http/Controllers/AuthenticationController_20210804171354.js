const bcrypt = require("bcrypt");

class AuthenticationController {
  async hash(password) {
    const saltRounds = 10;

    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
      return true;
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      return true;
    }

    await bcrypt.hash(password, saltRounds, (err, hash) => {
      return hash;
    });
  }
}

module.exports = AuthenticationController;

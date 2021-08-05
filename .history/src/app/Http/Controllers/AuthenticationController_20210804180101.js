const bcrypt = require("bcrypt");

class AuthenticationController {
  async hashPassword(password) {
    const saltRounds = 10;
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      console.error("Unable to generate hash:", error);
      return "fuck";
    }
    // return hashedPassword;
  }
}

module.exports = AuthenticationController;

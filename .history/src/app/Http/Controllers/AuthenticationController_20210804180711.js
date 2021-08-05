const bcrypt = require("bcrypt");

class AuthenticationController {
  async hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
}

module.exports = AuthenticationController;

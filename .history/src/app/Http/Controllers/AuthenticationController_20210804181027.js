const bcrypt = require("bcrypt");

class AuthenticationController {
  async hash(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
    /**************
     * SAMPLE USE *
     **************/
  }
}

module.exports = AuthenticationController;

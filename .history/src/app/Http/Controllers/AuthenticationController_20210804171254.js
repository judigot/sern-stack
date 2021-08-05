const bcrypt = require("bcrypt");

class AuthenticationController {
  hash(password) {
    const saltRounds = 10;

    await bcrypt.hash(password, saltRounds, async (err, hash) => {
      return hash;
    });
  }
}

module.exports = AuthenticationController;

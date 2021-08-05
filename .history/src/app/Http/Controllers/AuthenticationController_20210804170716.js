const bcrypt = require("bcrypt");

class AuthenticationController {
  hash(password) {
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function (err, hash) {
      return hash;
    });
  }
}

module.exports = AuthenticationController;

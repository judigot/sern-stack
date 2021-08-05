const bcrypt = require("bcrypt");

class AuthenticationController {
  hash(password) {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      return hash;
    });
  }
}

module.exports = AuthenticationController;

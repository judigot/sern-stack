const bcrypt = require("bcrypt");

class AuthenticationController {
  hash(password) {
    bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
      return hash;
    });
  }
}

module.exports = Database;

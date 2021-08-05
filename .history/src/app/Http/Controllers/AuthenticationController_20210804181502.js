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

async x(password) {
  const saltRounds = 10;

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });

  return hashedPassword;
}

module.exports = AuthenticationController;

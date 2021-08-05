const bcrypt = require("bcrypt");

class AuthenticationController {
  async hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
    /**************
     * SAMPLE USE *
     **************/
    /*

    const Auth = new AuthenticationController();
    const hashPassword = Auth.hash("123").then((hash) => {
      console.log(hash);
    });

    */
  }

  async verifyPassword(password, hash) {
    bcrypt.compare("123", hash, function (err, isCorrect) {
      if (isCorrect) {
        console.log("Correct password");
      } else {
        console.log("Incorrect password");
      }
    });
  }
}

module.exports = AuthenticationController;

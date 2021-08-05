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

  verifyPassword(password, hash) {
    bcrypt.compare(password, hash, function (err, isPasswordMatched) {
      if (isPasswordMatched) {
        console.log("Correct password");
      } else {
        console.log("Incorrect password");
      }
    });
  }
}

module.exports = AuthenticationController;

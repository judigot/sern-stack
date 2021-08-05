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
    const hashPassword = Auth.hash("password123").then((hash) => {
      console.log(hash);
    });

    */
  }

  async verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
    /**************
     * SAMPLE USE *
     **************/
    /*

    Auth.verifyPassword("password123", hash).then((isPasswordCorrect) => {
        if (isPasswordCorrect) {
        console.log("True");
        } else {
        console.log("False");
        }
    });

    */
  }
}

module.exports = AuthenticationController;

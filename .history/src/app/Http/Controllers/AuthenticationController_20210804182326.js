const bcrypt = require("bcrypt");

class AuthenticationController {
  async hash(password) {
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
}

module.exports = AuthenticationController;

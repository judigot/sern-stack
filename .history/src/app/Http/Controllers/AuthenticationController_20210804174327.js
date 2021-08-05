const bcrypt = require("bcrypt");

class AuthenticationController {
  async hash(password) {
    const saltRounds = 10;
    // await bcrypt.hash(password, saltRounds, (err, hash) => {
    //   return hash;
    // });
    // try {
    //   await bcrypt.hash(password, saltRounds, (err, hash) => {
    //     return hash;
    //   });
    // } catch (error) {
    //   console.error("Unable to generate hash:", error);
    //   return "fuck";
    // }
  }
}

module.exports = AuthenticationController;

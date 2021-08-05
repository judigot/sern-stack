const bcrypt = require("bcrypt");

class AuthenticationController {
  async hash(password) {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hash(password, saltRounds, (err, hash) => {
      resolve(hash);
    });
    // try {
    //   await bcrypt.hash(password, saltRounds, (err, hash) => {
    //     return hash;
    //   });
    // } catch (error) {
    //   console.error("Unable to generate hash:", error);
    //   return "fuck";
    // }
    return hashedPassword;
  }
}

module.exports = AuthenticationController;

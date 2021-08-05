const bcrypt = require("bcrypt");

class AuthenticationController {
  hash(password) {
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        console.log(hash);
        return hash;
      });

    // try {
    //   bcrypt.hash(password, saltRounds, (err, hash) => {
    //     console.log(hash);
    //     return hash;
    //   });
    // } catch (error) {
    //   console.error("Unable to generate hash:", error);
    //   return true;
    // }
  }
}

module.exports = AuthenticationController;

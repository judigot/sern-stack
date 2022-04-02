import bcrypt from "bcrypt";

class AuthenticationController {
  public static async hashPassword(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
    /**************
     * SAMPLE USE *
     **************/
    /*

    const Auth = new AuthenticationController();
    const hashPassword = Auth.hash("password123").then((hash) => {
      // Store hash to database
      console.log(hash);
    });

    */
  }

  public static async verifyPassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
    /**************
     * SAMPLE USE *
     **************/
    /*

    Auth.verifyPassword("password123", hash).then((isPasswordCorrect) => {
        if (isPasswordCorrect) {
          // Proceed to login
          console.log("True");
        } else {
          console.log("False");
        }
    });

    */
  }
}

export default AuthenticationController;

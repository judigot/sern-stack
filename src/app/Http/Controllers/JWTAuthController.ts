import "dotenv/config";

import { Request, Response, NextFunction } from "express";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

class JWTAuthController {
  static login(username: string, res: Response) {
    const accessToken = jwt.sign(
      { username: username },
      <string>process.env.ACCESS_TOKEN_SECRET
      // { expiresIn: "10m" }
    );

    const refreshToken = jwt.sign(
      { username: username },
      <string>process.env.REFRESH_TOKEN_SECRET
      // { expiresIn: "1d" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      // maxAge: 30 * 60 * 1000,
    });

    return accessToken;
  }

  static logout(res: Response) {
    res.clearCookie("accessToken");
    res.redirect("/login");
  }

  // Check if token is verified or expired
  static checkIfAuthenticated(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.accessToken;
    if (token) {
      jwt.verify(
        token,
        <string>process.env.ACCESS_TOKEN_SECRET,
        (error: any, user: any) => {
          // req.user = user;
          res.redirect("/user");
        }
      );
    } else {
      next();
    }
  }

  // Check if token is verified or expired
  static authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.accessToken;

    // Redirect if token is expired.
    // Prevents redirecting too many times
    if (token == null) res.redirect("/login");

    jwt.verify(
      token,
      <string>process.env.ACCESS_TOKEN_SECRET,
      (error: any, user: any) => {
        // Forbidden
        // if (error) return res.sendStatus(403);
        if (error) {
          this.logout(res);
        } else {
          // req.user = user;
          next();
        }
      }
    );
  }
}

export default JWTAuthController;

import { Request, Response, NextFunction } from "express";

import DB from "Classes/Database";
import Auth from "Controllers/AuthenticationController";

export default <any>{
  "/": {
    view: "index",
    chunks: ["main"],
    get: (req: Request, res: Response) => {
      res.render("index.ejs", { isProduction: process.env.IS_PRODUCTION });
    },
    post: () => {},
  },
  "/login": {
    view: "login",
    chunks: ["login"],
    get: (req: Request, res: Response) => {
      res.render("login.ejs", {
        isProduction: process.env.IS_PRODUCTION,
      });
    },
    post: (req: Request, res: Response) => {
      const username: string = req.body.username;
      const password: string = req.body.password;

      DB.read("SELECT `password` FROM `users` WHERE `email` = ?", [username])
        .then((result: { [key: string]: string }[]) => {
          const userExists = result.length !== 0;
          if (userExists) {
            const hash: string = result[0].password;
            Auth.verifyPassword(password, hash).then((passVerifiedResult) => {
              res.send({
                userExists: true,
                passWordValid: passVerifiedResult,
              });
              // if (passVerifiedResult) {
              //   // Successful login
              //   res.send({
              //     userExists: true,
              //     passWordValid: passVerifiedResult,
              //   });
              // }

              // if (!passVerifiedResult) {
              //   // Failed login
              // }
            });
          }

          if (!userExists) {
            res.send({
              userExists: false,
            });
          }
        })
        .catch((error: any) => {
          console.log(error);
        })
        .finally(() => {
          // Finally
        });
    },
  },
};

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
        .then((result) => {
          const hash: string = result[0].password;
          Auth.verifyPassword(password, hash).then((isPasswordCorrect) => {
            if (isPasswordCorrect) {
              // Successful login
            }
            res.send({
              isPassCorrect: isPasswordCorrect,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          // Finally
        });
    },
  },
};

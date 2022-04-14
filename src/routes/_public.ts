import { Request, Response, NextFunction } from "express";

import User from "Models/User";

import Auth from "Controllers/AuthenticationController";

export default <any>{
  "/": {
    view: "index",
    chunks: ["main"],
    get: (req: Request, res: Response) => {
      res.render("index.ejs", {
        pageTitle: Object.keys(req),
        NODE_ENV: process.env.NODE_ENV,
      });
    },
    post: () => {},
  },

  "/login": {
    view: "login",
    chunks: ["login"],

    get: (req: Request, res: Response) => {
      res.render("login.ejs", {
        NODE_ENV: process.env.NODE_ENV,
      });
    },

    post: (req: Request, res: Response) => {
      const username: string = req.body.username;
      const password: string = req.body.password;

      if (username && password) {
        User.read(`SELECT "password" FROM "${User.table}" WHERE "email" = ?;`, [
          username,
        ])
          .then((result: { [key: string]: string }[]) => {

            const userExists = result.length !== 0;

            if (userExists) {
              const hash: string = result[0].password;
              Auth.verifyPassword(password, hash).then((passVerifiedResult) => {
                res.send({
                  userExists: true,
                  passWordValid: passVerifiedResult,
                });
              });
            }

            if (!userExists) {
              res.send({
                userExists: false,
              });
            }
          })
          .catch((error: any) => {
            res.send({
              error: error,
            });
          });
      }
    },
  },
};

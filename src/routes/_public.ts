import { Request, Response, NextFunction } from "express";

import User from "Models/User";

import Auth from "Controllers/AuthenticationController";

import JWTAuthController from "Controllers/JWTAuthController";

export default <any>{
  "/": {
    view: "index",
    chunks: ["main"],
    middleware: JWTAuthController.checkAuthenticated,
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
    middleware: JWTAuthController.checkAuthenticated,

    get: (req: Request, res: Response) => {
      res.render("login.ejs", {
        NODE_ENV: process.env.NODE_ENV,
      });
    },

    post: (req: Request, res: Response) => {
      const username: string = req.body.username;
      const password: string = req.body.password;

      if (username && password) {
        User.read(`SELECT * FROM "${User.table}" WHERE "email" = ?;`, [
          username,
        ])
          .then((result: { [key: string]: string }[]) => {
            const userExists = result.length !== 0;

            if (userExists) {
              const hash: string = result[0].password;
              Auth.verifyPassword(password, hash).then((isPasswordValid) => {
                //====================JWT====================//
                const response: {
                  userExists: boolean;
                  passWordValid: boolean;
                  accessToken?: string;
                } = {
                  userExists: true,
                  passWordValid: isPasswordValid,
                };
                if (isPasswordValid) {
                  response.accessToken = JWTAuthController.login(
                    { username, user: result },
                    res
                  );
                }
                res.json(response);
                //====================JWT====================//
              });
            }

            if (!userExists) {
              res.send({
                userExists: false,
              });
            }
          })
          .catch((error: string) => {
            res.send({
              error: error,
            });
          });
      }
    },
  },
};

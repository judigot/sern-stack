import { Request, Response, NextFunction } from "express";

import User from "Models/User";

import Auth from "Controllers/AuthenticationController";

import JWTAuthController from "Controllers/JWTAuthController";

export default <object>{
  "/": {
    view: "index",
    chunks: ["main"],
    middleware: JWTAuthController.checkAuthenticated,
    get: (req: Request, res: Response) => {
      res.render("index.ejs", {
        pageTitle: "Big Bang",
        NODE_ENV: process.env.NODE_ENV,
      });
    },
    post: () => {},
  },

  "/auth": {
    view: "index",
    chunks: ["main"],
    post: (req: Request, res: Response) => {
      res.json(JWTAuthController.auth(req, res));
    },
  },

  "/logout": {
    view: "",
    chunks: [],
    post: (req: Request, res: Response) => {
      res.json(JWTAuthController.logoutClient(res));
    },
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

            const user: { [key: string]: string } = result[0];

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
                    { username, user },
                    res
                  );
                }
                res.json(response);
                //====================JWT====================//
              });
            }

            if (!userExists) {
              res.json({
                userExists: false,
              });
            }
          })
          .catch((error: string) => {
            res.json({
              error: error,
            });
          });
      }
    },
  },
};

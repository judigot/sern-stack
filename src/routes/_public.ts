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

  "/api/users": {
    view: "",
    chunks: [],
    middleware: JWTAuthController.checkAuthenticated,
    get: (req: Request, res: Response) => {
      User.all()
        .then((result) => {
          // Success
          res.json(result);
        })
        .catch((error) => {
          // Failure
        })
        .finally(() => {
          // Finally
        });
    },
    post: (req: Request, res: Response) => {
      const { searchQuery } = req.body;
      User.read(
        `SELECT * FROM Users WHERE firstName LIKE '%${searchQuery}%' OR lastName LIKE '%${searchQuery}%' OR email LIKE '%${searchQuery}%';`
      )
        .then((result) => {
          // Success
          console.log(result);
          res.json(result || null);
        })
        .catch((error) => {
          // Failure
          throw new Error(error);
        })
        .finally(() => {
          // Finally
        });
    },
  },

  "/api/users/:id": {
    view: "",
    chunks: [],
    middleware: JWTAuthController.checkAuthenticated,
    patch: (req: Request, res: Response) => {
      const { columnName, newValue } = req.body;
      User.update({ [columnName]: newValue }, { id: req.params.id })
        .then((result) => {
          // Success
          res.json(result);
        })
        .catch((error) => {
          // Failure
        })
        .finally(() => {
          // Finally
        });
    },
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
      const { username, password } = req.body;
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

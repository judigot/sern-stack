import { Request, Response, NextFunction } from "express";

import User from "Models/User";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import cookie from "cookie";

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

  "/user/logout": {
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
      console.log(req.body);
      if (username && password) {
        User.read(`SELECT "username", "password" FROM "user" WHERE "username" = ?;`, [username])
          .then((result) => {
            const user: { [key: string]: string } = result && result.rows[0];
            // If user exists
            if (user) {
              const hash: string = user.password;
              bcrypt.compare(password, hash).then((isCorrectPassword) => {
                let accessToken = undefined;
                if (isCorrectPassword) {
                  //====================JWT====================//
                  accessToken = jwt.sign(
                    user,
                    `${process.env.ACCESS_TOKEN_SECRET}`
                    // { expiresIn: "5s" }
                  );
                  res.setHeader(
                    "Set-Cookie",
                    cookie.serialize("accessToken", accessToken, {
                      httpOnly: true,
                      // maxAge: 60 * 60 * 24 * 7, // 1 week
                    })
                  );
                  //====================JWT====================//
                }
                res.status(200).json({
                  accessToken,
                });
              });
            }
            if (!user) {
              res.status(200).json(false);
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

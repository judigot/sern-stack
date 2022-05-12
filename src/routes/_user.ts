import { Request, Response, NextFunction } from "express";

import User from "Models/User";

import JWTAuthController from "Controllers/JWTAuthController";

export default <object>{
  "/logout": {
    view: "",
    chunks: [],
    get: (req: Request, res: Response) => {
      JWTAuthController.logout(res);
    },
    post: (req: Request, res: Response) => {
      res.json(JWTAuthController.logout(res));
    },
  },

  "/": {
    view: "user/home",
    chunks: [],
    // middleware: JWTAuthController.authenticate,
    get: (req: Request, res: Response) => {
      // User.all().then((result: object) => {
      //   res.send(result);
      // });
      const user: any = req.user;

      res.send(
        `<h1>Welcome back, ${user.username}</h1> 
        <form action="/user/logout" method="post">
        <input type="submit" value="Log Out">
        </form>`
      );
    },

    post: (req: Request, res: Response) => {
      const postData = req.body;
      res.send(postData);
    },
  },

  "/home": {
    view: "user/home",
    chunks: [],

    get: (req: Request, res: Response) => {
      res.render("user/home.ejs", {
        NODE_ENV: process.env.NODE_ENV,
      });
    },
  },

  "/home/:id": {
    view: "user/home",
    chunks: [],

    get: (req: Request, res: Response) => {
      res.send(`<h1>User ID = ${req.params.id}</h1>`);
    },
  },
};

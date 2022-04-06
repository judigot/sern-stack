import { Request, Response, NextFunction } from "express";

import User from "Models/User";

export default <any>{
  "/": {
    view: "user/home",
    chunks: [],
    get: (req: Request, res: Response) => {
      User.all().then((result: any) => {
        res.send(result.rows);
      });
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
};

import { Request, Response, NextFunction } from "express";

import DB from "app/Classes/Database";

export default <any>{
  "/": {
    view: "user/home",
    chunks: [],
    get: (req: Request, res: Response) => {
      DB.read("SELECT * from `users`;").then((result: any) => {
        res.send(result);
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

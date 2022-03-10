import { Request, Response, NextFunction } from "express";

import DB from "Classes/Database";

export default <any>{
  "/user": {
    view: "home.ejs",
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
  "/user/home": {
    view: "home.ejs",
    chunks: [],
    get: (req: Request, res: Response) => {
      res.render("user/home.ejs", {
        isProduction: process.env.IS_PRODUCTION,
      });
    },
  },
};

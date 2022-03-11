import { Request, Response, NextFunction } from "express";

import DB from "Classes/Database";

const routes: any = {
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

export const views: any = [];

Object.keys(routes).forEach((url, index, array) => {
  let { get: get, post: post, ...newValues } = routes[url];
  views[url] = newValues;
});

console.log(views);

export default routes;

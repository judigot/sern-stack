import { Request, Response, NextFunction } from "express";

export default <any>{
  "/": {
    view: "index",
    chunks: ["main"],
    get: (req: Request, res: Response) => {
      res.render("index.ejs", { isProduction: process.env.IS_PRODUCTION });
    },
    post: () => {},
  },
  "/login": {
    view: "login",
    chunks: ["login"],
    get: (req: Request, res: Response) => {
      res.render("login.ejs", {
        isProduction: process.env.IS_PRODUCTION,
      });
    },
  },
};

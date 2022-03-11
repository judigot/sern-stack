import { Request, Response, NextFunction } from "express";

export default <any>{
  "/index": {
    view: "index",
    chunks: ["vendor", "main"],
    get: (req: Request, res: Response) => {
      res.render("index.ejs", { isProduction: process.env.IS_PRODUCTION });
    },
    post: () => {},
  },
  "/login": {
    view: "index.ejs",
    chunks: ["vendor", "login"],
    get: (req: Request, res: Response) => {
      res.render("login.ejs", {
        isProduction: process.env.IS_PRODUCTION,
      });
    },
  },
};

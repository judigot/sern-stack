// Public routes
import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.render("index.ejs", { isProduction: process.env.IS_PRODUCTION });
});

router.get("/login", (req: Request, res: Response) => {
  res.render("login.ejs", { isProduction: process.env.IS_PRODUCTION });
});

export default router;

// User Routes
import express, { Request, Response, Router } from "express";
import DB from "../app/Classes/Database";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  DB.read("SELECT * from `users`;").then((result: any) => {
    res.send(result);
  });
});

router.get("/:id/:type", (req, res) => {
  res.send(req.params);
});

export default router;

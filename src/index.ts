// Require .env file
require("dotenv").config();

// *production environment port may not be 5000, hence the "process.env.PORT"
const PORT = process.env.PORT || 3000;

// Load environment
import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";

// Variables
const app: Application = express();
const viewsFolder: string = `views`;

// Set view engine
app.set("views", path.resolve(__dirname, viewsFolder));
app.set("view engine", "ejs");

app.use(express.json());

//================================================================================//

import DB from "./app/Classes/Database";

//================================================================================//
DB.update("users", { lastName: "00000" }).then(() => {
  DB.update("users", { lastName: "11111" }, { id: 1 }).then(() => {
    DB.update("users", { lastName: "22222" }, undefined, { id: [2, 3] }).then(
      () => {
        DB.update("users", { lastName: "33333" }, { id: [4, 5] }).then(() => {
          DB.update(
            "users",
            { lastName: "44444" },
            { id: 6 },
            { id: [7, 8] }
          ).then(() => {
            DB.update(
              "users",
              { lastName: "55555", email: "Success" },
              { id: 9 },
              { id: [10] }
            ).then(() => {
              // Multiple where statements
              DB.update(
                "users",
                { email: "Success" },
                { id: 1, firstName: "Judyboy" },
                { id: [3, 4] }
              );
            });
          });
        });
      }
    );
  });
});

//================================================================================//

// Set up route
app.get("/", (req: Request, res: Response) => {
  res.render("index.ejs", { isProduction: process.env.IS_PRODUCTION });
});

app.get("/users/:id/:type", (req, res) => {
  res.send(req.params);
});

// Set up route
app.get("/users", (req: Request, res: Response) => {
  DB.read("SELECT * from `users`;").then((result: any) => {
    res.send(result);
  });
});

//================================================================================//

// Initialize port
app.listen(PORT);

// Serve static files (CSS, JS, images, fonts, etc.)
app.use(express.static(path.resolve(__dirname, "public")));

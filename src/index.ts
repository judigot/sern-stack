// Import .env file
import "dotenv/config";

// *production environment port may not be 5000, hence the "process.env.PORT"
const PORT = process.env.PORT || 3000;

// Load environment
import path from "path";
import express, { Application } from "express";
import cookieParser from "cookie-parser";

// Variables
const app: Application = express();
const viewsFolder: string = `views`;

//==========CORS==========//
// Disable CORS errors; Enable requests from front-end
app.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*"); // Allow all websites to access the server
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Allow only specific sites to access the server
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH");
    return res.status(200).json({});
  }
  //   if (req.method === "POST") {
  //     return res.status(404).json({}); // Send a 404 response to the browser
  //   }
  next();
});
//==========CORS==========//

// Runs every time a route is accessed
// app.use(function (req, res, next) {
//   console.log("Hello, World!");
//   next();
// });

// Set view engine
app.set("views", path.resolve(__dirname, viewsFolder));
app.set("view engine", "ejs");

// Parses incoming requests with JSON
app.use(express.json());

app.use(cookieParser());

// Serve static files (CSS, JS, images, fonts, etc.)
app.use(express.static(path.resolve(__dirname, "public")));

// Parse POST and PUT requests
app.use(express.urlencoded({ extended: true }));

//================================================================================//
// import routes from "./routes/RoutesMaster";

// RoutesMaster
// app.use("/", routes);

//====================JWT====================//
import User from "Models/User";
import Auth from "Controllers/AuthenticationController";
import jwt from "jsonwebtoken";

app.get("/user", authenticate, (req, res) => {
  res.send(
    `<h1>Logged in</h1>
    <form action="/logout" method="post">
    <input type="submit" value="Submit">
    </form>`
  );
});

app.get("/login", checkIfAuthenticated, (req: any, res) => {
  if (req.user) {
    res.redirect("/user");
  } else {
    res.render("login.ejs", {
      NODE_ENV: process.env.NODE_ENV,
    });
  }
});

app.post("/logout", (req: any, res) => {
  res.clearCookie("accessToken");
  res.redirect("/login");
});

// Check if token is verified or expired
function authenticate(req: any, res: any, next: any) {
  const token = req.cookies.accessToken;

  // Redirect if token is expired.
  // Prevents redirecting too many times
  if (token == null) res.redirect("/login");

  jwt.verify(
    token,
    <string>process.env.ACCESS_TOKEN_SECRET,
    (error: any, user: any) => {
      // Forbidden
      // if (error) return res.sendStatus(403);
      if (error) {
        res.redirect("/login");
      } else {
        req.user = user;
        next();
      }
    }
  );
}

// Check if token is verified or expired
function checkIfAuthenticated(req: any, res: any, next: any) {
  const token = req.cookies.accessToken;
  if (token) {
    jwt.verify(
      token,
      <string>process.env.ACCESS_TOKEN_SECRET,
      (error: any, user: any) => {
        req.user = user;
        res.redirect("/user");
      }
    );
  } else {
    next();
  }
}

app.post("/login", (req, res) => {
  const username: string = req.body.username;
  const password: string = req.body.password;

  if (username && password) {
    User.read(`SELECT "password" FROM "${User.table}" WHERE "email" = ?;`, [
      username,
    ])
      .then((result: { [key: string]: string }[]) => {
        const userExists = result.length !== 0;
        if (userExists) {
          const hash: string = result[0].password;
          Auth.verifyPassword(password, hash).then((passVerifiedResult) => {
            //====================JWT====================//
            const accessToken = jwt.sign(
              { username: username },
              <string>process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: "10s" }
            );
            const refreshToken = jwt.sign(
              { username: username },
              <string>process.env.REFRESH_TOKEN_SECRET,
              { expiresIn: "1d" }
            );

            res.cookie("accessToken", accessToken, {
              httpOnly: true,
              maxAge: 30 * 60 * 1000,
            });

            res.json({
              userExists: true,
              passWordValid: passVerifiedResult,
              accessToken: accessToken,
            });
            //====================JWT====================//
          });
        }
        if (!userExists) {
          res.send({
            userExists: false,
          });
        }
      })
      .catch((error: any) => {
        res.send({
          error: error,
        });
      });
  }
});
//====================JWT====================//

//================================================================================//
// Initialize port
app.listen(PORT);

console.log(`Express server started at http://localhost:${PORT}`);

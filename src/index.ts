// Import .env file
import "dotenv/config";

// *production environment port may not be 5000, hence the "process.env.PORT"
const PORT = process.env.PORT || 3000;
// ?

// Load environment
import path from "path";
import express, { Application } from "express";
import cookieParser from "cookie-parser";

// Variables
const app: Application = express();
const viewsFolder: string = `views`;
//

//==========CORS==========//
// Disable CORS errors; Enable requests from front-end
app.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*"); // Allow all websites to access the server
  res.header("Access-Control-Allow-Origin", "*"); // Allow only specific sites to access the server
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

import { MongoClient, ServerApiVersion } from "mongodb";

// const url = "mongodb://root:example@localhost:27017";
const url =
  "mongodb+srv://admin:123@firstcluster.gyxjlfz.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
interface GameData {
  player1: string;
  player2: string;
  scoreBoard: {
    winner: number;
    board: Array<(boolean | string)[]>;
  }[];
  date: Date;
}

//====================ROUTESMASTER====================//

const dbName = "tictactoe";

app.get("/getSessions", async (req, res) => {
  try {
    await client.connect();
    const DB = client.db(dbName);
    const Sessions = DB.collection("sessions");
    const data = await Sessions.find({}).sort({ date: -1 }).toArray();
    res.json(data);
  } catch (error: unknown) {
    if (typeof error === `string`) {
      throw new Error(`There was an error: error`);
    }
    if (error instanceof Error) {
      throw new Error(`There was an error: ${error.message}`);
    }
    if (error instanceof SyntaxError) {
      // Unexpected token < in JSON
      throw new Error(`Syntax Error: error`);
    }
  }
});

app.post("/insertSession", async (req, res) => {
  const data: GameData = {
    ...req.body,
    ...{ date: new Date() },
  };
  try {
    await client.connect();
    const DB = client.db(dbName);
    const Sessions = DB.collection("sessions");
    const result = await Sessions.insertOne(data);
    res.json(result);
  } catch (error: unknown) {
    if (typeof error === `string`) {
      throw new Error(`There was an error: error`);
    }
    if (error instanceof Error) {
      throw new Error(`There was an error: ${error.message}`);
    }
    if (error instanceof SyntaxError) {
      // Unexpected token < in JSON
      throw new Error(`Syntax Error: error`);
    }
  }
});

//====================ROUTESMASTER====================//

//================================================================================//
// Initialize port
app.listen(PORT);

console.log(`Express server started at http://localhost:${PORT}`);

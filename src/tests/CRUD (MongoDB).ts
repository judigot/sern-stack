import { MongoClient } from "mongodb";

const url = "mongodb://root:example@localhost:27017";
const client = new MongoClient(url);

interface GameData {
  player1: string;
  player2: string;
  scoreBoard: {
    winner: number;
    board: Array<(boolean | string)[]>;
  }[];
}

// Database Name
const dbName = "tictactoe";

const insertSessions = async (data: GameData[]) => {
  try {
    await client.connect();
    const DB = client.db(dbName);
    const Sessions = DB.collection("sessions");
    const result = Sessions.insertMany(data);
    return result;
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
  } finally {
  }
};

const getSessions = async () => {
  try {
    await client.connect();
    const DB = client.db(dbName);
    const Sessions = DB.collection("sessions");
    const data = Sessions.find({}).toArray();
    return data;
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
  } finally {
  }
};

(async () => {
  try {
    const data: any = await getSessions();
    console.log(data);
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
  } finally {
  }
})();

import "tsconfig-paths/register"; // Parse path aliases
import User from "Models/User";
import Auth from "./src/app/Http/Controllers/AuthenticationController";

// User.read("SELECT `firstName` FROM `" + User.table + "` WHERE `id` = ?;", [
//   1,
// ]).then((result) => {
//   console.log(result);

//   // expect([{ firstName: "Jude Francis" }]).toStrictEqual([
//   //   { firstName: "Jude Francis" },
//   // ]);
// });
const newValue = "22222";
const referenceValue = [1, 2, 3, 4];

User.read(
  "SELECT `lastName` FROM `Users` WHERE `id` IN (" +
    referenceValue.join(", ") +
    ") GROUP BY `lastName`;"
).then((result) => {
  // const postgresResult = result && result.rows;
  console.log(result);

  // return postgresResult[0]["lastName"];
});

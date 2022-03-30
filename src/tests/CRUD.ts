import "tsconfig-paths/register"; // Parse path aliases

import DB from "Classes/Database";

DB.read("SELECT `firstName` FROM `users` WHERE `id` = ?;", [1]).then(
  (result) => {
    console.log(result);
  }
);

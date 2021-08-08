import DB from "./src/app/Classes/Database";

// DB.update("users", { lastName: "00000" });

// DB.update("users", { lastName: "11111" }, { id: 1 });
// DB.update("users", { lastName: "22222" }, undefined, { id: [1, 2, 3, 4] });
// DB.update("users", { lastName: "33333" }, { id: [1, 2, 3, 4] });

// DB.update("users", { lastName: "44444" }, { id: 1 }, { id: [2, 3, 4] });
// DB.update(
//   "users",
//   { email: "55555" },
//   { firstName: "Jude Francis", lastName: "Torot" },
//   { id: [2, 3, 4] }
// );
// DB.delete("users", "id", 1)
//   .then((value) => {
//     console.log(value);
//   })
//   .catch((error) => {
//     console.log(error);
//   })
//   .finally(() => {
//     // Finally
//   });
DB.delete("users", "id", [2, 3, 4, 5])
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    // Finally
  });

// const sql = "DELETE FROM ? WHERE ? IN (?, ?, ?, ?);";

// const array = ["users", "id", "?", "?", "?", "?"];

// console.log(replaceValues(sql, array));

function replaceValues(string: string, replacements: any) {
  let i = 0;
  return string.replace(/\?/g, () => {
    return replacements[i++];
  });
}

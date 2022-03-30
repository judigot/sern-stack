import "tsconfig-paths/register"; // Parse path aliases

import DB from "Classes/Database";

import Auth from "Controllers/AuthenticationController";

/**Test Requisites
 * Make sure the database exists
 * Data must be freshly seeded
 * Dotenv variables must imported
 ****/

test("CREATE", async () => {
  return Auth.hashPassword("123").then((hash) => {
    DB.create("users", {
      firstName: "Jude",
      lastName: "Igot",
      email: "judigot@gmail.com",
      password: hash,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).then(async (result) => {
      expect(result["affectedRows"]).toStrictEqual(1);
    });
  });
});

test("CREATE: Insert Multiple Rows", async () => {
  return Auth.hashPassword("123").then((hash) => {
    DB.create("users", [
      {
        firstName: "Jude",
        lastName: "Igot",
        email: "judigot@gmail.com",
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Judy Gwapo",
        lastName: "Igot",
        email: "judigot@gmail.com",
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]).then((result) => {
      expect(result["affectedRows"]).toStrictEqual(2);
    });
  });
});

test("READ", async () => {
  return DB.read("SELECT `firstName` FROM `users` WHERE `id` = ?;", [1]).then(
    (result) => {
      expect(result).toStrictEqual([{ firstName: "Jude Francis" }]);
    }
  );
});

test("UPDATE: All rows", async () => {
  const newValue = "00000";
  return DB.update("users", { lastName: newValue }).then(async (result) => {
    const totalRows = await DB.read(
      "SELECT COUNT(*) AS `count` FROM `users` WHERE `lastName` = ?;",
      [newValue]
    ).then((result) => {
      return result[0]["count"];
    });
    expect(result["affectedRows"]).toStrictEqual(totalRows);
  });
});

test("UPDATE: Single row with one condition", async () => {
  const newValue = "11111";
  const referenceValue = 1;
  return DB.update(
    "users",
    { lastName: newValue },
    { id: referenceValue }
  ).then(async (result) => {
    const affectedValue = await DB.read(
      "SELECT `lastName` FROM `users` WHERE `id` = ?;",
      [referenceValue]
    ).then((result) => {
      return result[0]["lastName"];
    });
    const expected = {
      affectedRows: result["affectedRows"],
      newValue: affectedValue,
    };
    const reference = {
      affectedRows: 1,
      newValue: newValue,
    };
    expect(expected).toStrictEqual(reference);
  });
});

test("UPDATE: Multiple rows with one condition (undefined WHERE clause)", async () => {
  const newValue = "22222";
  const referenceValue = [1, 2, 3, 4];
  return DB.update("users", { lastName: newValue }, undefined, {
    id: referenceValue,
  }).then(async (result1) => {
    const affectedValue = await DB.read(
      "SELECT `lastName` FROM `users` WHERE `id` IN (" +
        referenceValue.join(", ") +
        ") GROUP BY `lastName`;",
      referenceValue
    ).then((result) => {
      return result[0]["lastName"];
    });

    const expected = {
      affectedRows: result1["affectedRows"],
      newValue: affectedValue,
    };

    const reference = {
      affectedRows: referenceValue.length,
      newValue: newValue,
    };
    expect(expected).toStrictEqual(reference);
  });
});

test("UPDATE: Multiple rows with one condition (IN operator)", async () => {
  const newValue = "33333";
  const referenceValue = [1, 2, 3, 4];
  return DB.update(
    "users",
    { lastName: newValue },
    {
      id: referenceValue,
    }
  ).then(async (result1) => {
    const affectedValue = await DB.read(
      "SELECT `lastName` FROM `users` WHERE `id` IN (" +
        referenceValue.join(", ") +
        ") GROUP BY `lastName`;",
      referenceValue
    ).then((result) => {
      return result[0]["lastName"];
    });

    const expected = {
      affectedRows: result1["affectedRows"],
      newValue: affectedValue,
    };

    const reference = {
      affectedRows: referenceValue.length,
      newValue: newValue,
    };
    expect(expected).toStrictEqual(reference);
  });
});

test("UPDATE: Multiple rows with one condition (WHERE and IN combined)", async () => {
  const newValue = "44444";
  const where = { id: 1 };
  const referenceValue = [2, 3, 4];
  return DB.update("users", { lastName: newValue }, where, {
    id: referenceValue,
  }).then(async (result1) => {
    const affectedValue = await DB.read(
      "SELECT `lastName` FROM `users` WHERE `id` IN (" +
        referenceValue.join(", ") +
        ") GROUP BY `lastName`;",
      referenceValue
    ).then((result) => {
      return result[0]["lastName"];
    });

    const expected = {
      affectedRows: result1["affectedRows"],
      newValue: affectedValue,
    };

    const reference = {
      affectedRows: referenceValue.length + 1, // Where clause included
      newValue: newValue,
    };
    expect(expected).toStrictEqual(reference);
  });
});

test("UPDATE: Multiple rows with a different WHERE condition (WHERE and IN combined)", async () => {
  const newValue = "55555";
  const where = { firstName: "Jude Francis" };
  const referenceValue = [2, 3, 4];
  return DB.update("users", { lastName: newValue }, where, {
    id: referenceValue,
  }).then(async (result1) => {
    const affectedValue = await DB.read(
      "SELECT `lastName` FROM `users` WHERE `id` IN (" +
        referenceValue.join(", ") +
        ") GROUP BY `lastName`;",
      referenceValue
    ).then((result) => {
      return result[0]["lastName"];
    });

    const expected = {
      affectedRows: result1["affectedRows"],
      newValue: affectedValue,
    };

    const reference = {
      affectedRows: referenceValue.length + 1, // Where clause included
      newValue: newValue,
    };
    expect(expected).toStrictEqual(reference);
  });
});

test("DELETE: Multiple rows a condition", async () => {
  return DB.delete("users", "id", [3, 4]).then((result) => {
    expect(result["affectedRows"]).toStrictEqual(2);
  });
});

test("DELETE: Multiple a single row using a number reference", async () => {
  return DB.delete("users", "id", 5).then((result) => {
    expect(result["affectedRows"]).toStrictEqual(1);
  });
});

test("DELETE: Multiple a single row using a string reference", async () => {
  return DB.delete("users", "id", "6").then((result) => {
    expect(result["affectedRows"]).toStrictEqual(1);
  });
});

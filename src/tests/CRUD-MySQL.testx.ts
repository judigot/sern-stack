import "tsconfig-paths/register"; // Parse path aliases
import User from "Models/User";

import Auth from "Controllers/AuthenticationController";

/**Test Requisites
 * Make sure the database exists
 * Data must be freshly seeded
 * Dotenv variables must imported
 ****/

test("CREATE", async () => {
  return Auth.hashPassword("123").then((hash) => {
    User.create({
      firstName: "Jude",
      lastName: "Igot",
      email: "judigot@gmail.com",
      password: hash,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).then(async (result) => {
      expect(result[0]["affectedRows"]).toStrictEqual(1);
    });
  });
});

test("CREATE: Insert Multiple Rows", async () => {
  return Auth.hashPassword("123").then((hash) => {
    User.create([
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
      expect(result[0]["affectedRows"]).toStrictEqual(2);
    });
  });
});

test("READ", async () => {
  return User.read(
    "SELECT `firstName` FROM `" + User.table + "` WHERE `id` = ?;",
    [1]
  ).then((result) => {
    expect(result[0]).toStrictEqual([{ firstName: "Jude Francis" }]);
  });
});

test("UPDATE: All rows", async () => {
  const newValue = "00000";
  return User.update({ lastName: newValue }).then(async (result) => {
    const totalRows = await User.read(
      "SELECT COUNT(*) AS `count` FROM `" +
        User.table +
        "` WHERE `lastName` = ?;",
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
  return User.update({ lastName: newValue }, { id: referenceValue }).then(
    async (result) => {
      const affectedValue = await User.read(
        "SELECT `lastName` FROM `" + User.table + "` WHERE `id` = ?;",
        [referenceValue]
      ).then((result) => {
        return result[0][0]["lastName"];
      });
      const expected = {
        affectedRows: result[0]["affectedRows"],
        newValue: affectedValue,
      };
      const reference = {
        affectedRows: 1,
        newValue: newValue,
      };
      expect(expected).toStrictEqual(reference);
    }
  );
});

test("UPDATE: Multiple rows with one condition (undefined WHERE clause)", async () => {
  const newValue = "22222";
  const referenceValue = [1, 2, 3, 4];
  return User.update({ lastName: newValue }, undefined, {
    id: referenceValue,
  }).then(async (result1) => {
    const affectedValue = await User.read(
      "SELECT `lastName` FROM `" +
        User.table +
        "` WHERE `id` IN (" +
        referenceValue.join(", ") +
        ") GROUP BY `lastName`;"
    ).then((result) => {
      return result[0][0]["lastName"];
    });

    const expected = {
      affectedRows: result1[0]["affectedRows"],
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
  return User.update(
    { lastName: newValue },
    {
      id: referenceValue,
    }
  ).then(async (result1) => {
    const affectedValue = await User.read(
      "SELECT `lastName` FROM `" +
        User.table +
        "` WHERE `id` IN (" +
        referenceValue.join(", ") +
        ") GROUP BY `lastName`;"
    ).then((result) => {
      return result[0][0]["lastName"];
    });

    const expected = {
      affectedRows: result1[0]["affectedRows"],
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
  return User.update({ lastName: newValue }, where, {
    id: referenceValue,
  }).then(async (result1) => {
    const affectedValue = await User.read(
      "SELECT `lastName` FROM `" +
        User.table +
        "` WHERE `id` IN (" +
        referenceValue.join(", ") +
        ") GROUP BY `lastName`;"
    ).then((result) => {
      return result[0][0]["lastName"];
    });

    const expected = {
      affectedRows: result1[0]["affectedRows"],
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
  return User.update({ lastName: newValue }, where, {
    id: referenceValue,
  }).then(async (result1) => {
    const affectedValue = await User.read(
      "SELECT `lastName` FROM `" +
        User.table +
        "` WHERE `id` IN (" +
        referenceValue.join(", ") +
        ") GROUP BY `lastName`;"
    ).then((result) => {
      return result[0][0]["lastName"];
    });

    const expected = {
      affectedRows: result1[0]["affectedRows"],
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
  return User.delete("id", [3, 4]).then((result) => {
    expect(result[0]["affectedRows"]).toStrictEqual(2);
  });
});

test("DELETE: Multiple a single row using a number reference", async () => {
  return User.delete("id", 5).then((result) => {
    expect(result[0]["affectedRows"]).toStrictEqual(1);
  });
});

test("DELETE: Multiple a single row using a string reference", async () => {
  return User.delete("id", "6").then((result) => {
    expect(result[0]["affectedRows"]).toStrictEqual(1);
  });
});

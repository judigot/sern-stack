// import { Model } from "sequelize-typescript";

const Models = require("./src-js/models");

Models.User.create({
  firstName: "Judy",
  lastName: "Igot",
  email: "judigot@gmail.com",
  password: "$2b$10$hi41dPYJv0a6NcnvrUFVqevSI5Ehxzp29yNvAkD.GXfuz98Mlt0wq",
  createdAt: new Date(),
  updatedAt: new Date(),
});

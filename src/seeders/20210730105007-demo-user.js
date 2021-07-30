"use strict";
import Database from "../app/Classes/Database";
// import Utility from "./app/Utilities/Utility";
// const Utility = require ("../app/Utilities/Utility");
// const utility = new Utility();

// const p = utility.hashPassword();

const DB = new Database();

DB.helloWorld();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Jude Francis",
          lastName: "Igot",
          email: "judigot@gmail.com",
          password: p,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

"use strict";

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

    // Insert into `users` table
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Jude Francis",
          lastName: "Igot",
          email: "judigot@gmail.com",
          password:
            "$2b$10$hi41dPYJv0a6NcnvrUFVqevSI5Ehxzp29yNvAkD.GXfuz98Mlt0wq",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Judyboy",
          lastName: "Igot",
          email: "judigot@gmail.com",
          password:
            "$2b$10$hi41dPYJv0a6NcnvrUFVqevSI5Ehxzp29yNvAkD.GXfuz98Mlt0wq",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Judas",
          lastName: "Igot",
          email: "judigot@gmail.com",
          password:
            "$2b$10$hi41dPYJv0a6NcnvrUFVqevSI5Ehxzp29yNvAkD.GXfuz98Mlt0wq",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Torot",
          lastName: "Igot",
          email: "judigot@gmail.com",
          password:
            "$2b$10$hi41dPYJv0a6NcnvrUFVqevSI5Ehxzp29yNvAkD.GXfuz98Mlt0wq",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Judigot",
          lastName: "Igot",
          email: "judigot@gmail.com",
          password:
            "$2b$10$hi41dPYJv0a6NcnvrUFVqevSI5Ehxzp29yNvAkD.GXfuz98Mlt0wq",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    // Insert into `posts` table
    await queryInterface.bulkInsert(
      "Posts",
      [
        {
          postName: "Sample Post",
          postOwner: 1,
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

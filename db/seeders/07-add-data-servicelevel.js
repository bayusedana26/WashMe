"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("servicelevel", [
      {
        servicelevel: "Basic",
        days: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        servicelevel: "Express",
        days: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
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

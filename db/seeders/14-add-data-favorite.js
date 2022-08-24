"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("favorite", [
      {
        user_id: "d96e2f15-52ef-40ec-932c-1003d9249869",
        laundry_id: "8d1a2361-0989-4ac2-8ab2-34f60c994fb8",
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

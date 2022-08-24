"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("item", [
      {
        clothes: "T-shirt",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        clothes: "Shirt",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        clothes: "Jacket",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        clothes: "Short Pants",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        clothes: "Long Pants",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        clothes: "Shoes",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        clothes: "Blanket",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        clothes: "Towel",
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

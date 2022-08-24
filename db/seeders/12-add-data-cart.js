"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("cart", [
      {
        user_id: "d96e2f15-52ef-40ec-932c-1003d9249869",
        laundry_id: "8dd4bf56-bbfd-4e4d-a12b-24b02fe3c30c",
        ordertype_id: 1,
        servicelist_id: 1,
        servicelevel_id: 1,
        weight: null,
        item: `[{"id": 1, "quantity": 4}, {"id": 3, "quantity": 2}]`,
        estimatePrice: 8000,
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

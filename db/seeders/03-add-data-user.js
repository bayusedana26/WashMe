"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("user", [
      {
        id: "d96e2f15-52ef-40ec-932c-1003d9249869",
        name: "Fikri Lubis",
        email: "fikrilubis@example.com",
        password: "Fikrilubis_123!!",
        mobile_phone: "0812345163572",
        address: null,
        role: "customer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "d96e2f15-52ef-40ec-932c-1003d9249870",
        name: "Alfian Yuandika",
        email: "alfian@example.com",
        password: "Alfianyuandika_123!!",
        mobile_phone: "0812345163573",
        address: null,
        role: "customer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "d96e2f15-52ef-40ec-932c-1003d9249871",
        name: "Bayu Sedana",
        email: "Bayu@example.com",
        password: "Bayucoba123!!",
        mobile_phone: "0812345163574",
        address: null,
        role: "customer",
        status: "Active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
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

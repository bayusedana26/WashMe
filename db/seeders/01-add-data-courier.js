'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("courier", [
      {
        name: "Courier 1",
        mobile_phone: "081212345678",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Courier 2",
        mobile_phone: "081212345679",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Courier 3",
        mobile_phone: "081212345677",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Courier 4",
        mobile_phone: "081212345676",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Courier 5",
        mobile_phone: "081212345675",
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
  }
};

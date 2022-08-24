'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("orderstatus", [
      {
        status: "Waiting for pick up",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: "Picked up",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: "Washing",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: "Drying",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: "Ironing",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: "Ready to deliver",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: "Deliver back",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: "Finished",
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

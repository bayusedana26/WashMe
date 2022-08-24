"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("servicelist", [
      {
        services: "Wash & Iron",
        imageBasic: "services/washIronBasic.png",
        imageExpress: "services/washIronExpress.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        services: "Wash Only",
        imageBasic: "services/washBasic.png",
        imageExpress: "services/washExpress.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        services: "Iron Only",
        imageBasic: "services/ironBasic.png",
        imageExpress: "services/ironExpress.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        services: "Dry Clean",
        imageBasic: "services/dryClean.png",
        imageExpress: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        services: "Shoes",
        imageBasic: "services/shoes.png",
        imageExpress: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        services: "Household",
        imageBasic: "services/household.png",
        imageExpress: null,
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

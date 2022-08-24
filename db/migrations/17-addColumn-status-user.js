"use strict";

module.exports = {
  // Add column without undo migrations
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("user", "status", {
      type: Sequelize.ENUM("Pending", "Active"),
      defaultValue: "Pending",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("user", "status", {
      type: Sequelize.ENUM("Pending", "Active"),
      defaultValue: "Pending",
    });
  },
};

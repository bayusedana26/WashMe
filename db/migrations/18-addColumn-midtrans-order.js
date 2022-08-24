"use strict";

module.exports = {
  // Add multiple column without undo migrations
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      // Add status field
      await queryInterface.addColumn("order", "online_payment", {
        type: Sequelize.ENUM("Pending", "Failed", "Success"),
        defaultValue: "Pending",
      }),
      // Add expiredPayment field
      await queryInterface.addColumn("order", "expiredPayment", {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(Date.now() + 60 * 60 * 1000),
      }),
      // Add token field
      await queryInterface.addColumn("order", "token", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      // add redirect_url field
      await queryInterface.addColumn("order", "redirect_url", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      // Add status field
      await queryInterface.addColumn("order", "online_payment", {
        type: Sequelize.ENUM("Pending", "Failed", "Success"),
        defaultValue: "Pending",
      }),
      // Add expiredPayment field
      await queryInterface.addColumn("order", "expiredPayment", {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(Date.now() + 10 * 60 * 1000),
      }),
      // Add token field
      await queryInterface.addColumn("order", "token", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      // add redirect_url field
      await queryInterface.addColumn("order", "redirect_url", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },
};

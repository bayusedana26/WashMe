("use strict");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("laundry", {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.UUID,
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      mobile_phone: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      image: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: "defaults/laundry.png",
      },
      address: {
        allowNull: true,
        type: Sequelize.JSON,
      },
      pickUpAndDelivery: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      courier_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      total_services: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      by_item: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      by_weight: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      total_review: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      average_rating: {
        allowNull: false,
        type: Sequelize.DECIMAL,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("laundry");
  },
};

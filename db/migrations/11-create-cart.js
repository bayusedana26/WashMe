const { v4: uuidv4 } = require("uuid");

("use strict");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("cart", {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.UUID,
        defaultValue: uuidv4(),
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      laundry_id: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      ordertype_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      servicelist_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      servicelevel_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      weight: {
        allowNull: true,
        type: Sequelize.DECIMAL,
      },
      item: {
        allowNull: true,
        type: Sequelize.JSON([
          {
            id: {
              allowNull: true,
              type: Sequelize.INTEGER,
              references: {
                table: "item",
                field: "id",
              },
              onUpdate: "cascade",
              onDelete: "cascade",
            },
            name: {
              allowNull: true,
              type: Sequelize.STRING,
            },
            quantity: {
              type: Sequelize.INTEGER,
              allowNull: true,
            },
          },
        ]),
      },
      estimatePrice: {
        allowNull: false,
        type: Sequelize.DECIMAL,
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
    await queryInterface.dropTable("cart");
  },
};

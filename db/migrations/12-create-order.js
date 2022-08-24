("use strict");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("order", {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.UUID,
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
      estimateFinish: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      estimatePrice: {
        allowNull: true,
        type: Sequelize.DECIMAL,
      },
      pickUpChoice: {
        allowNull: false,
        type: Sequelize.ENUM("Delivery", "Self Pickup"),
      },
      pickUpAddress: {
        allowNull: true,
        type: Sequelize.JSON,
      },
      deliveryAddress: {
        allowNull: true,
        type: Sequelize.JSON,
      },
      delivery_fee: {
        allowNull: true,
        type: Sequelize.DECIMAL,
      },
      admin_charge: {
        allowNull: false,
        type: Sequelize.DECIMAL,
        defaultValue: 7000,
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      paymentStatus: {
        allowNull: false,
        type: Sequelize.ENUM("Paid", "Unpaid"),
      },
      paymentImage: {
        allowNull: true,
        type: Sequelize.STRING,
        get() {
          const image = this.getDataValue("image");

          if (!image) {
            return image;
          }
          return "/images/" + image;
        },
      },
      paymentType: {
        allowNull: false,
        type: Sequelize.ENUM("Cash", "Debit", "E-wallet"),
      },
      orderstatus_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("order");
  },
};

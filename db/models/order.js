"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: DataTypes.UUID,
      laundry_id: DataTypes.UUID,
      ordertype_id: DataTypes.INTEGER,
      servicelist_id: DataTypes.INTEGER,
      servicelevel_id: DataTypes.INTEGER,
      weight: DataTypes.DECIMAL,
      item: DataTypes.JSON,
      estimateFinish: DataTypes.DATE,
      estimatePrice: DataTypes.DECIMAL,
      pickUpChoice: DataTypes.ENUM("Delivery", "Self Pickup"),
      pickUpAddress: DataTypes.JSON,
      deliveryAddress: DataTypes.JSON,
      delivery_fee: DataTypes.DECIMAL,
      admin_charge: DataTypes.DECIMAL,
      totalPrice: DataTypes.DECIMAL,
      // For payment Gateway 37-40
      online_payment: DataTypes.ENUM("Pending", "Failed", "Success"),
      expiredPayment: DataTypes.DATE,
      token: DataTypes.STRING,
      redirect_url: DataTypes.STRING,
      paymentStatus: DataTypes.ENUM("Paid", "Unpaid"),
      paymentImage: {
        type: DataTypes.STRING,
        get() {
          const image = this.getDataValue("image");

          if (!image) {
            return image;
          }
          return "/images/" + image;
        },
      },
      paymentType: DataTypes.ENUM("Cash", "Debit/credit card", "E-wallet"),
      orderstatus_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
      modelName: "order",
    }
  );
  return order;
};

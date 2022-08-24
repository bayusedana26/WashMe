"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cart.init(
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
      estimatePrice: DataTypes.DECIMAL,
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
      modelName: "cart",
    }
  );
  return cart;
};

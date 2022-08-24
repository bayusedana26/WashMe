"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class weightprice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  weightprice.init(
    {
      laundry_id: DataTypes.UUID,
      servicelist_id: DataTypes.INTEGER,
      servicelevel_id: DataTypes.INTEGER,
      price: DataTypes.DECIMAL,
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
      modelName: "weightprice",
    }
  );
  return weightprice;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class itemprice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  itemprice.init(
    {
      laundry_id: DataTypes.UUID,
      servicelist_id: DataTypes.INTEGER,
      servicelevel_id: DataTypes.INTEGER,
      price: DataTypes.DECIMAL,
      item_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
      modelName: "itemprice",
    }
  );
  return itemprice;
};

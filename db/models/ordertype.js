"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ordertype extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ordertype.init(
    {
      types: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
      modelName: "ordertype",
    }
  );
  return ordertype;
};

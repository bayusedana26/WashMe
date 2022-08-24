"use strict";
const {
  dangerouslyDisableDefaultSrc,
} = require("helmet/dist/middlewares/content-security-policy");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class servicelevel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  servicelevel.init(
    {
      servicelevel: DataTypes.STRING,
      days: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
      modelName: "servicelevel",
    }
  );
  return servicelevel;
};

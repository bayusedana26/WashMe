"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class servicelist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  servicelist.init(
    {
      services: DataTypes.STRING,
      imageBasic: {
        type: DataTypes.STRING,
        get() {
          const imageBasic = this.getDataValue("imageBasic");

          if (!imageBasic) {
            return imageBasic;
          }
          return "https://washme.gabatch11.my.id/images/" + imageBasic;
        },
      },
      imageExpress: {
        type: DataTypes.STRING,
        get() {
          const imageExpress = this.getDataValue("imageExpress");

          if (!imageExpress) {
            return imageExpress;
          }
          return "https://washme.gabatch11.my.id/images/" + imageExpress;
        },
      } 
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
      modelName: "servicelist",
    }
  );
  return servicelist;
};

"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class laundry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  laundry.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, defaultValue: "Laundry" },
      email: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("password", bcrypt.hashSync(value, 10));
        },
      },
      mobile_phone: DataTypes.STRING,
      image: {
        type: DataTypes.STRING,
        defaultValue: "defaults/laundry.png",
        get() {
          const image = this.getDataValue("image");

          if (!image) {
            return image;
          }
          return "/images/" + image;
        },
      },
      address: DataTypes.JSON,
      pickUpAndDelivery: DataTypes.BOOLEAN,
      courier_id: DataTypes.INTEGER,
      total_services: DataTypes.INTEGER,
      by_item: DataTypes.BOOLEAN,
      by_weight: DataTypes.BOOLEAN,
      total_review: DataTypes.INTEGER,
      average_rating: DataTypes.DECIMAL,
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
      modelName: "laundry",
    }
  );
  return laundry;
};

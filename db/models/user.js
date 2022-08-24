"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, defaultValue: "Customer" },
      email: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("password", bcrypt.hashSync(value, 10));
        },
      },
      mobile_phone: DataTypes.STRING,
      address: DataTypes.JSON,
      role: DataTypes.ENUM("admin", "customer"),
      status: DataTypes.ENUM("Pending", "Active"),
      image: {
        type: DataTypes.STRING,
        defaultValue: "defaults/user.png",
        get() {
          const image = this.getDataValue("image");

          if (!image) {
            return image;
          }
          return "/images/" + image;
        },
      },
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
      modelName: "user",
    }
  );
  return user;
};

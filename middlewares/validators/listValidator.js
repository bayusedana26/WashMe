const validator = require("validator");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {
  servicelist,
  servicelevel,
  ordertype,
  laundry,
  item,
  cart,
} = require("../../db/models");

module.exports.create = async (req, res, next) => {
  try {
    let errors = [];

    let findData = await Promise.all([
      laundry.findOne({
        where: {
          id: req.body.laundry,
        },
      }),
      ordertype.findOne({
        where: {
          id: req.body.type,
        },
      }),
      servicelist.findOne({
        where: {
          id: req.body.service,
        },
      }),
      servicelevel.findOne({
        where: {
          id: req.body.level,
        },
      }),
    ]);

    if (Object.keys(req.body).includes("item")) {
      let paramsItem = [];

      req.body.item = JSON.parse(req.body.item);
      await req.body.item.forEach((el) => {
        paramsItem.push(el.id);
      });

      let data = await item.findAll({
        where: {
          id: {
            [Op.or]: paramsItem,
          },
        },
      });

      if (data.length != paramsItem.length) {
        errors.push("Item ID is not valid");
      }
    }

    if (Object.keys(req.body).includes("weight")) {
      if (!validator.isNumeric(req.body.weight)) {
        errors.push("Weight must be a number");
      }
    }

    if (!findData[0]) {
      errors.push("Laundry not found");
    }
    if (!findData[1]) {
      errors.push("Order type ID is not valid");
    }
    if (!findData[2]) {
      errors.push("Service list ID is not valid");
    }
    if (!findData[3]) {
      errors.push("Service level ID is not valid");
    }
    if (!validator.isNumeric(req.body.price)) {
      errors.push("Price must be a number");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    next();
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    let data = await cart.findOne({
      where: {
        id: req.params.id
      },
    });

    if (!data) {
      return res.status(400).json({
        message: "List not found",
      });
    } else {
      if (data.dataValues.user_id != req.user.id) {
        return res.status(403).json({
          message: "Forbidden access",
        });
      }
    }

    next();
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};

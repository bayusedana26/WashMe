const validator = require("validator");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {
  cart,
  courier,
  item,
  itemprice,
  laundry,
  order,
  orderstatus,
  ordertype,
  review,
  servicelevel,
  servicelist,
  user,
  weightprice,
} = require("../../db/models");

module.exports.create = async (req, res, next) => {
  try {
    let errors = [];
    let estimateFinish;
    let paymentType = ["Cash", "Debit/credit card", "E-wallet"];
    let pickUpChoice = ["Delivery", "Self Pickup"];

    req.body.pickUpAddress = JSON.parse(req.body.pickUpAddress);
    req.body.deliveryAddress = JSON.parse(req.body.deliveryAddress);

    let findData = await Promise.all([
      laundry.findOne({
        where: {
          id: req.body.laundry_id,
        },
      }),
      ordertype.findOne({
        where: {
          id: req.body.ordertype_id,
        },
      }),
      servicelist.findOne({
        where: {
          id: req.body.servicelist_id,
        },
      }),
      servicelevel.findOne({
        where: {
          id: req.body.servicelevel_id,
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

    if (Object.keys(req.body).includes("estimatePrice")) {
      if (!validator.isNumeric(req.body.estimatePrice)) {
        errors.push("Estimate Price must be a number");
      }
    }

    if (!validator.isNumeric(req.body.totalPrice)) {
      errors.push("Total Price must be a number");
    }

    if (!validator.isNumeric(req.body.servicelist_id)) {
      errors.push("Servicelist ID must be a number");
    }

    if (!validator.isNumeric(req.body.servicelevel_id)) {
      errors.push("Servicelevel ID must be a number");
    }

    if (!validator.isNumeric(req.body.ordertype_id)) {
      errors.push("Ordertype ID must be a number");
    }

    if (!validator.isNumeric(req.body.delivery_fee)) {
      errors.push("Delivery fee must be a number");
    }

    if (!validator.isNumeric(req.body.admin_charge)) {
      errors.push("Admin Charge must be a number");
    }

    if (!pickUpChoice.includes(req.body.pickUpChoice)) {
      errors.push("Pickup Choice Is Not Valid");
    }

    if (!paymentType.includes(req.body.paymentType)) {
      errors.push("Payment Type Is Not Valid");
    }

    if (errors.length > 0) {
      console.log(errors);
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    if (req.body.servicelevel_id == 1) {
      estimateFinish = new Date();
      estimateFinish.setDate(new Date().getDate() + 4);
    } else {
      estimateFinish = new Date();
      estimateFinish.setDate(new Date().getDate() + 2);
    }

    req.body.estimateFinish = estimateFinish;

    next();
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};

module.exports.update = async (req, res, next) => {
  try {
    let errors = [];

    let findData = await order.findOne({
      where: { id: req.params.id },
    });

    if (!findData) {
      errors.push("Order Not found");
    }

    if (!validator.isNumeric(req.body.orderstatus_id)) {
      errors.push("Orderstatus must be a number");
    }

    if (!validator.isNumeric(req.body.weight)) {
      errors.push("Weight must be a number");
    }

    if (!validator.isCurrency(req.body.totalPrice)) {
      errors.push("Price must be a number");
    }

    if (req.body.orderstatus_id < 1 || req.body.orderstatus_id > 8) {
      errors.push("Orderstatus ID is not valid");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    // Go to next
    next();
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    let errors = [];

    let findData = await order.findOne({
      where: { id: req.params.id },
    });

    if (!findData) {
      errors.push("Order Not Found");
    }

    if (errors.length > 0) {
      return res.status(404).json({
        message: errors.join(", "),
      });
    }

    // Go to next
    next();
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};

const crypto = require("crypto");
const path = require("path");
const { user } = require("../db/models");
const nodemailer = require("nodemailer");

class CustomerController {
  // Get One
  async getOne(req, res) {
    try {
      // Find one data
      let data = await user.findOne({
        where: {
          id: req.params.id,
        },
      });

      // If data not found
      if (!data) {
        return res.status(404).json({
          message: `customer ${req.params.id} Not Found`,
        });
      }

      // If success
      return res.status(200).json({
        message: "Success",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  // Update user
  async update(req, res) {
    let update = {
      name: req.body.name,
      mobile_phone: req.body.mobile_phone,
    };
    try {
      // Update User
      let data = await user.update(update, {
        where: {
          id: req.params.id,
        },
        attributes: ["name", "mobile_phone"],
      });
      const name = update.name;
      const mobile_phone = update.mobile_phone;

      // new is to return the updated data
      // If no new, it will return the old data before updated

      // If success
      return res.status(201).json({
        message: "Success",
        data,
        name,
        mobile_phone,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
}

module.exports = new CustomerController();

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const path = require("path");
const {
  servicelist,
  servicelevel,
  item,
  ordertype,
  orderstatus,
} = require("../db/models");

class UtilsController {
  async getAllServices(req, res) {
    try {
      let data = await servicelist.findAll({
        attributes: ["id", "services", "imageBasic"],
      });

      if (data.length == 0) {
        return res.status(400).json({
          message: "Services not found",
        });
      }

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

  async getAllItems(req, res) {
    try {
      let data = await item.findAll({
        attributes: ["id", "clothes"],
      });

      if (data.length == 0) {
        return res.status(400).json({
          message: "Services not found",
        });
      }

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

  async getAllLevels(req, res) {
    try {
      let data = await servicelevel.findAll({
        attributes: ["id", "servicelevel", "days"],
      });

      if (data.length == 0) {
        return res.status(400).json({
          message: "Services not found",
        });
      }

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

  async getAllTypes(req, res) {
    try {
      let data = await ordertype.findAll({
        attributes: ["id", "types"],
      });

      if (data.length == 0) {
        return res.status(400).json({
          message: "Services not found",
        });
      }

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

  async getAllOrderStatus(req, res) {
    try {
      let data = await orderstatus.findAll({
        attributes: ["id", "status"],
      });

      if (data.length == 0) {
        return res.status(400).json({
          message: "Services not found",
        });
      }

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
}

module.exports = new UtilsController();

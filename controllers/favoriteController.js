const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const path = require("path");
const {
  favorite,
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
} = require("../db/models");

class FavoriteController {
  async create(req, res) {
    try {
      let data = await favorite.create({
        user_id: req.user.id,
        laundry_id: req.body.laundry_id,
      });

      return res.status(201).json({
        message: "Success add to favorites",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error,
      });
    }
  }

  async getAll(req, res) {
    try {
      // Find All favorite Data
      let data = await favorite.findAll({
        where: {
          user_id: req.user.id,
        },
        attributes: ["id"],
        include: [
          {
            model: laundry,
            attributes: [
              "id",
              "name",
              "pickUpAndDelivery",
              "address",
              "by_item",
              "by_weight",
              "total_review",
            ],
          },
        ],
      });

      // If no data found
      if (data.length === 0) {
        return res.status(404).json({
          message: "No favorite Data",
        });
      }
      // If Success
      return res.status(200).json({
        message: "All favorite Data Found",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error,
      });
    }
  }

  async delete(req, res) {
    try {
      let data = await favorite.destroy({
        where: {
          id: req.params.id,
        },
      });

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

module.exports = new FavoriteController();

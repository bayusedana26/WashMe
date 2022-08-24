const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const path = require("path");
const {
  cart,
  laundry,
  ordertype,
  servicelist,
  servicelevel,
} = require("../db/models");

class CartController {
  async create(req, res) {
    try {
      let data = await cart.create({
        user_id: req.user.id,
        laundry_id: req.body.laundry,
        ordertype_id: req.body.type,
        servicelist_id: req.body.service,
        servicelevel_id: req.body.level,
        weight: req.body.weight,
        item: req.body.item,
        estimatePrice: req.body.price,
      });

      return res.status(201).json({
        message: "Success Add to List",
        data,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  async getAll(req, res) {
    try {
      let clearData;
      let data = [];
      //console.log(req.body.list[0].dataValues.ordertype.dataValues.id);
      await req.body.list.forEach((el) => {
        if (el.dataValues.ordertype.dataValues.id == 1) {
          if (el.dataValues.servicelevel.dataValues.id == 1) {
            clearData = {
              id: el.dataValues.id,
              laundry: {
                id: el.dataValues.laundry.dataValues.id,
                name: el.dataValues.laundry.dataValues.name,
              },
              ordertype: {
                id: el.dataValues.ordertype.dataValues.id,
                name: el.dataValues.ordertype.dataValues.types,
              },
              item: el.dataValues.item,
              service: {
                id: el.dataValues.servicelist.dataValues.id,
                name: el.dataValues.servicelist.dataValues.services,
                level: {
                  id: el.dataValues.servicelevel.dataValues.id,
                  name: el.dataValues.servicelevel.dataValues.servicelevel,
                  days: el.dataValues.servicelevel.dataValues.days,
                  image: "/images/" + el.dataValues.servicelist.dataValues.imageBasic,
                },
              },
              price: el.dataValues.estimatePrice,
            };
          } else {
            clearData = {
              id: el.dataValues.id,
              laundry: {
                id: el.dataValues.laundry.dataValues.id,
                name: el.dataValues.laundry.dataValues.name,
              },
              ordertype: {
                id: el.dataValues.ordertype.dataValues.id,
                name: el.dataValues.ordertype.dataValues.types,
              },
              item: el.dataValues.item,
              service: {
                id: el.dataValues.servicelist.dataValues.id,
                name: el.dataValues.servicelist.dataValues.services,
                level: {
                  id: el.dataValues.servicelevel.dataValues.id,
                  name: el.dataValues.servicelevel.dataValues.servicelevel,
                  days: el.dataValues.servicelevel.dataValues.days,
                  image: "/images/" + el.dataValues.servicelist.dataValues.imageExpress,
                },
              },
              price: el.dataValues.estimatePrice,
            };
          }
        } else {
          if (el.dataValues.servicelevel.dataValues.id == 1) {
            clearData = {
              id: el.dataValues.id,
              laundry: {
                id: el.dataValues.laundry.dataValues.id,
                name: el.dataValues.laundry.dataValues.name,
              },
              ordertype: {
                id: el.dataValues.ordertype.dataValues.id,
                name: el.dataValues.ordertype.dataValues.types,
              },
              weight: el.dataValues.weight,
              item: el.dataValues.item,
              service: {
                id: el.dataValues.servicelist.dataValues.id,
                name: el.dataValues.servicelist.dataValues.services,
                level: {
                  id: el.dataValues.servicelevel.dataValues.id,
                  name: el.dataValues.servicelevel.dataValues.servicelevel,
                  days: el.dataValues.servicelevel.dataValues.days,
                  image: "/images/" + el.dataValues.servicelist.dataValues.imageBasic,
                },
              },
              price: el.dataValues.estimatePrice,
            };
          } else {
            clearData = {
              id: el.dataValues.id,
              laundry: {
                id: el.dataValues.laundry.dataValues.id,
                name: el.dataValues.laundry.dataValues.name,
              },
              ordertype: {
                id: el.dataValues.ordertype.dataValues.id,
                name: el.dataValues.ordertype.dataValues.types,
              },
              weight: el.dataValues.weight,
              item: el.dataValues.item,
              service: {
                id: el.dataValues.servicelist.dataValues.id,
                name: el.dataValues.servicelist.dataValues.services,
                level: {
                  id: el.dataValues.servicelevel.dataValues.id,
                  name: el.dataValues.servicelevel.dataValues.servicelevel,
                  days: el.dataValues.servicelevel.dataValues.days,
                  image: "/images/" + el.dataValues.servicelist.dataValues.imageExpress,
                },
              },
              price: el.dataValues.estimatePrice,
            };
          }
        }
        data.push(clearData);
      });
      return res.status(200).json({
        message: "Success",
        data: data
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  async delete(req, res) {
    try {
      let data = await cart.destroy({
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

module.exports = new CartController();

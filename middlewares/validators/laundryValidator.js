const validator = require("validator");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {
  servicelist,
  servicelevel,
  ordertype,
  laundry,
} = require("../../db/models");

const limit = 5;

module.exports.paginate = async (req, res, next) => {
  try {
    let errors = [];
    if (Object.keys(req.query).includes("page")) {
      if (!validator.isNumeric(req.query.page)) {
        errors.push("Parameter page must be a number");
      }
    } else {
      req.query.page = 1;
    }
    if (Object.keys(req.query).includes("limit")) {
      if (!validator.isNumeric(req.query.limit)) {
        errors.push("Parameter limit must be a number");
      }
    } else {
      req.query.limit = limit;
    }
    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }
    next();
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};

module.exports.getOneLaundry = async (req, res, next) => {
  try {
    let paramsservicelist = [];
    let findData = await laundry.findAll({
      attributes: [
        "id",
        "name",
        "image",
        "address",
        "mobile_phone",
        "total_services",
        "pickUpAndDelivery",
        "average_rating",
        "total_review",
      ],
      where: {
        id: req.params.id,
      },
    });

    if (findData.length == 0) {
      return res.status(400).json({
        message: "Laundry not found",
      });
    } else {
      if (Object.keys(req.query).includes("service")) {
        await req.query.service.split(",").forEach((el) => {
          paramsservicelist.push(el);
        });

        let data = await servicelist.findAll({
          where: {
            id: {
              [Op.or]: paramsservicelist,
            },
          },
        });
        if (data.length == 0) {
          return res.status(400).json({
            message: "Service list ID is not valid",
          });
        } else {
          req.query.service = paramsservicelist;
        }
      } else {
        req.query.service = ["1"];
      }
    }

    req.body.dataLaundry = findData;
    next();
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};

module.exports.searchLaundry = async (req, res, next) => {
  try {
    let errors = [];
    let paramsservicelist = [];
    let paramsservicelevel = [];
    let paramsordertype = [];

    if (Object.keys(req.query).includes("name")) {
      if (req.query.name.length > 0) {
        next();
      } else {
        if (Object.keys(req.query).includes("service")) {
          if (req.query.service.length == 0 || req.query.service == undefined) {
            paramsservicelist = ["1", "2", "3", "4", "5", "6"];
          } else {
            await req.query.service.split(",").forEach((el, index) => {
              paramsservicelist.push(el);
            });
            let data = await servicelist.findAll({
              where: {
                id: {
                  [Op.or]: paramsservicelist,
                },
              },
            });

            if (data.length == 0) {
              errors.push("Service List ID is not valid");
            }
          }
        }

        if (Object.keys(req.query).includes("level")) {
          if (req.query.level.length == 0 || req.query.level == undefined) {
            paramsservicelevel = ["1", "2"];
          } else {
            await req.query.level.split(",").forEach((el) => {
              paramsservicelevel.push(el);
            });
            let data = await servicelevel.findAll({
              where: {
                id: {
                  [Op.or]: paramsservicelevel,
                },
              },
            });

            if (data.length == 0) {
              errors.push("Service Level ID is not valid");
            }
          }
        }

        if (Object.keys(req.query).includes("type")) {
          if (req.query.type.length == 0 || req.query.type == undefined) {
            req.query.type = "1,2";
          } else {
            await req.query.type.split(",").forEach((el) => {
              paramsordertype.push(el);
            });
            let data = await ordertype.findAll({
              where: {
                id: {
                  [Op.or]: paramsordertype,
                },
              },
            });

            if (data.length == 0) {
              errors.push("Order Type ID is not valid");
            }
          }
        }

        if (errors.length > 0) {
          return res.status(400).json({
            message: errors.join(", "),
          });
        }

        req.body.service = paramsservicelist;
        req.body.level = paramsservicelevel;

        next();
      }
    } else {
      if (Object.keys(req.query).includes("service")) {
        if (req.query.service.length == 0 || req.query.service == undefined) {
          paramsservicelist = ["1", "2", "3", "4", "5", "6"];
        } else {
          await req.query.service.split(",").forEach((el, index) => {
            paramsservicelist.push(el);
          });
          let data = await servicelist.findAll({
            where: {
              id: {
                [Op.or]: paramsservicelist,
              },
            },
          });

          if (data.length == 0) {
            errors.push("Service List ID is not valid");
          }
        }
      }

      if (Object.keys(req.query).includes("level")) {
        if (req.query.level.length == 0 || req.query.level == undefined) {
          paramsservicelevel = ["1", "2"];
        } else {
          await req.query.level.split(",").forEach((el) => {
            paramsservicelevel.push(el);
          });
          let data = await servicelevel.findAll({
            where: {
              id: {
                [Op.or]: paramsservicelevel,
              },
            },
          });

          if (data.length == 0) {
            errors.push("Service Level ID is not valid");
          }
        }
      }

      if (Object.keys(req.query).includes("type")) {
        if (req.query.type.length == 0 || req.query.type == undefined) {
          req.query.type = "1,2";
        } else {
          await req.query.type.split(",").forEach((el) => {
            paramsordertype.push(el);
          });
          let data = await ordertype.findAll({
            where: {
              id: {
                [Op.or]: paramsordertype,
              },
            },
          });

          if (data.length == 0) {
            errors.push("Order Type ID is not valid");
          }
        }
      }

      if (errors.length > 0) {
        return res.status(400).json({
          message: errors.join(", "),
        });
      }

      req.body.service = paramsservicelist;
      req.body.level = paramsservicelevel;

      next();
    }
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};

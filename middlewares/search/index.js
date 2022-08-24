const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {
  itemprice,
  weightprice,
  servicelist,
  servicelevel,
  item,
  cart,
  laundry,
  ordertype,
  courier,
  order,
  orderstatus,
} = require("../../db/models");

async function finditemprice(servicelist, servicelevel) {
  let cleanData = [];
  let findData = await itemprice.findAll({
    where: {
      servicelist_id: {
        [Op.or]: servicelist,
      },
      servicelevel_id: {
        [Op.or]: servicelevel,
      },
    },
  });

  await findData.forEach((el, index) => {
    cleanData.push(el.dataValues.laundry_id);
  });

  return cleanData.filter((val, i) => cleanData.indexOf(val) === i);
}

async function findweightprice(servicelist, servicelevel) {
  let cleanData = [];
  let findData = await weightprice.findAll({
    where: {
      servicelist_id: {
        [Op.or]: servicelist,
      },
      servicelevel_id: {
        [Op.or]: servicelevel,
      },
    },
  });

  await findData.forEach((el, index) => {
    cleanData.push(el.dataValues.laundry_id);
  });

  return cleanData.filter((val, i) => cleanData.indexOf(val) === i);
}

async function findItemweightprice(servicelist, servicelevel) {
  let findData = [];

  findData.push(await finditemprice(servicelist, servicelevel));
  findData.push(await findweightprice(servicelist, servicelevel));

  let combineData = await findData[0].concat(findData[1]);

  return combineData.filter((val, i) => combineData.indexOf(val) === i);
}

exports.findLaundryId = async (req, res, next) => {
  try {
    let data = [];

    if (Object.keys(req.query).includes("name")) {
      if (req.query.name.length > 0) {
        next();
      } else {
        if (Object.keys(req.query).includes("type")) {
          if (req.query.type == 1) {
            if (req.body.service.length > 0 || req.body.level.length > 0) {
              data = await finditemprice(req.body.service, req.body.level);
              if (data.length == 0) {
                return res.status(400).json({
                  message: "Laundry not found",
                });
              }
              req.body.laundry_id = data;
              next();
            } else {
              let cleanData = [];
              let findData = await itemprice.findAll();
              await findData.forEach((el) => {
                cleanData.push(el.dataValues.laundry_id);
              });
              data = await cleanData.filter(
                (val, i) => cleanData.indexOf(val) === i
              );
              if (data.length == 0) {
                return res.status(400).json({
                  message: "Laundry not found",
                });
              }
              req.body.laundry_id = data;
              next();
            }
          } else if (req.query.type == 2) {
            if (req.body.service.length > 0 || req.body.level.length > 0) {
              data = await findweightprice(req.body.service, req.body.level);
              if (data.length == 0) {
                return res.status(400).json({
                  message: "Laundry not found",
                });
              }
              req.body.laundry_id = data;
              next();
            } else {
              let cleanData = [];
              let findData = await weightprice.findAll();
              await findData.forEach((el) => {
                cleanData.push(el.dataValues.laundry_id);
              });
              data = await cleanData.filter(
                (val, i) => cleanData.indexOf(val) === i
              );
              if (data.length == 0) {
                return res.status(400).json({
                  message: "Laundry not found",
                });
              }
              req.body.laundry_id = data;
              next();
            }
          } else {
            if (req.body.service.length > 0 || req.body.level.length > 0) {
              data = await findItemweightprice(
                req.body.service,
                req.body.level
              );

              if (data.length == 0) {
                return res.status(400).json({
                  message: "Laundry not found",
                });
              }
              req.body.laundry_id = data;
              next();
            } else {
              let cleanData = [];
              let findData = await Promise.all([
                itemprice.findAll(),
                weightprice.findAll(),
              ]);
              let combineData = await findData[0].concat(findData[1]);
              await combineData.forEach((el) => {
                cleanData.push(el.dataValues.laundry_id);
              });
              data = await cleanData.filter(
                (val, i) => cleanData.indexOf(val) === i
              );
              if (data.length == 0) {
                return res.status(400).json({
                  message: "Laundry not found",
                });
              }
              req.body.laundry_id = data;
              next();
            }
          }
        } else {
          if (req.body.service.length > 0 || req.body.level.length > 0) {
            data = await findItemweightprice(req.body.service, req.body.level);

            if (data.length == 0) {
              return res.status(400).json({
                message: "Laundry not found",
              });
            }
            req.body.laundry_id = data;
            next();
          } else {
            if (Object.keys(req.query).includes("deliver")) {
              next();
            } else {
              return res.status(400).json({
                message: "Please Insert Parameter",
              });
            }
          }
        }
      }
    } else {
      if (Object.keys(req.query).includes("type")) {
        if (req.query.type == 1) {
          if (req.body.service.length > 0 || req.body.level.length > 0) {
            data = await finditemprice(req.body.service, req.body.level);
            if (data.length == 0) {
              return res.status(400).json({
                message: "Laundry not found",
              });
            }
            req.body.laundry_id = data;
            next();
          } else {
            let cleanData = [];
            let findData = await itemprice.findAll();
            await findData.forEach((el) => {
              cleanData.push(el.dataValues.laundry_id);
            });
            data = await cleanData.filter(
              (val, i) => cleanData.indexOf(val) === i
            );
            if (data.length == 0) {
              return res.status(400).json({
                message: "Laundry not found",
              });
            }
            req.body.laundry_id = data;
            next();
          }
        } else if (req.query.type == 2) {
          if (req.body.service.length > 0 || req.body.level.length > 0) {
            data = await findweightprice(req.body.service, req.body.level);
            if (data.length == 0) {
              return res.status(400).json({
                message: "Laundry not found",
              });
            }
            req.body.laundry_id = data;
            next();
          } else {
            let cleanData = [];
            let findData = await weightprice.findAll();
            await findData.forEach((el) => {
              cleanData.push(el.dataValues.laundry_id);
            });
            data = await cleanData.filter(
              (val, i) => cleanData.indexOf(val) === i
            );
            if (data.length == 0) {
              return res.status(400).json({
                message: "Laundry not found",
              });
            }
            req.body.laundry_id = data;
            next();
          }
        } else {
          if (req.body.service.length > 0 || req.body.level.length > 0) {
            data = await findItemweightprice(req.body.service, req.body.level);

            if (data.length == 0) {
              return res.status(400).json({
                message: "Laundry not found",
              });
            }
            req.body.laundry_id = data;
            next();
          } else {
            let cleanData = [];
            let findData = await Promise.all([
              itemprice.findAll(),
              weightprice.findAll(),
            ]);
            let combineData = await findData[0].concat(findData[1]);
            await combineData.forEach((el) => {
              cleanData.push(el.dataValues.laundry_id);
            });
            data = await cleanData.filter(
              (val, i) => cleanData.indexOf(val) === i
            );
            if (data.length == 0) {
              return res.status(400).json({
                message: "Laundry not found",
              });
            }
            req.body.laundry_id = data;
            next();
          }
        }
      } else {
        if (req.body.service.length > 0 || req.body.level.length > 0) {
          data = await findItemweightprice(req.body.service, req.body.level);

          if (data.length == 0) {
            return res.status(400).json({
              message: "Laundry not found",
            });
          }
          req.body.laundry_id = data;
          next();
        } else {
          if (Object.keys(req.query).includes("deliver")) {
            next();
          } else {
            return res.status(400).json({
              message: "Please Insert Parameter",
            });
          }
        }
      }
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};

exports.getAllServices = async (req, res, next) => {
  try {
    let findData = await Promise.all([
      itemprice.findAll({
        where: {
          laundry_id: req.params.id,
          servicelist_id: {
            [Op.or]: req.query.service,
          },
        },
        attributes: ["price"],
        include: [
          {
            model: servicelist,
            attributes: ["id", "services", "imageBasic", "imageExpress"],
          },
          {
            model: servicelevel,
            attributes: ["id", "servicelevel", "days"],
          },
          {
            model: item,
            attributes: ["id", "clothes"],
          },
        ],
      }),
      weightprice.findAll({
        where: {
          laundry_id: req.params.id,
          servicelist_id: {
            [Op.or]: req.query.service,
          },
        },
        attributes: ["price"],
        include: [
          {
            model: servicelist,
            attributes: ["id", "services", "imageBasic", "imageExpress"],
          },
          {
            model: servicelevel,
            attributes: ["id", "servicelevel", "days"],
          },
        ],
      }),
    ]);

    let combineData = await findData[0].concat(findData[1]);

    req.body.combineData = combineData;

    next();
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};

exports.getAllList = async (req, res, next) => {
  try {
    let data = await cart.findAll({
      where: {
        user_id: req.user.id,
      },
      order: [
        ['createdAt', 'DESC']
      ],
      attributes: ["id", "weight", "item", "estimatePrice"],
      include: [
        {
          model: laundry,
          attributes: ["id", "name"],
        },
        {
          model: ordertype,
          attributes: ["id", "types"],
        },
        {
          model: servicelevel,
          attributes: ["id", "servicelevel", "days"],
        },
        {
          model: servicelist,
          attributes: ["id", "services", "imageBasic", "imageExpress"],
        },
      ],
    });

    if (data.length == 0) {
      return res.status(400).json({
        message: "Your list is empty",
      });
    }

    req.body.list = data;

    next();
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    let data = await order.findOne({
      where: {
        user_id: req.user.id,
        id: req.params.id,
      },
      attributes: [
        "id",
        "weight",
        "item",
        "estimateFinish",
        "estimatePrice",
        "pickUpAddress",
        "deliveryAddress",
        "delivery_fee",
        "admin_charge",
        "totalPrice",
        "paymentType",
        "createdAt",
      ],
      include: [
        {
          model: laundry,
          attributes: ["id", "name"],
          include: [
            {
              model: courier,
              attributes: ["name"],
            },
          ],
        },
        {
          model: servicelist,
          attributes: ["id", "services", "imageBasic", "imageExpress"],
        },
        {
          model: servicelevel,
          attributes: ["id", "servicelevel"],
        },
        {
          model: ordertype,
          attributes: ["id", "types"],
        },
        {
          model: orderstatus,
          attributes: ["id", "status"],
        },
      ],
    });

    if (!data) {
      return res.status(404).json({
        message: "Order Not Found",
      });
    }

    req.body.order = data;

    next();
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};

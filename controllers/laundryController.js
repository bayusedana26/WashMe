const crypto = require("crypto");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const path = require("path");
const {
  laundry,
  weightprice,
  itemprice,
  servicelist,
  servicelevel,
  item,
} = require("../db/models");

const { paginate } = require("../utils/paginate");

let attributes = [
  "id",
  "name",
  "image",
  "address",
  "total_services",
  "by_item",
  "by_weight",
  "pickUpAndDelivery",
  "average_rating",
];

let order = [
  ["total_services", "DESC"],
  ["average_rating", "DESC"],
];

function getMin(price) {
  let min;
  return price.length == 0
    ? (min = null)
    : (min = Math.min.apply(Math, price).toString());
}

async function getServices(service) {
  let services = [];
  await service.forEach((el) => {
    if (el != null) {
      services.push(el);
    }
  });
  return services;
}

class LaundryController {
  // Get One
  async getOne(req, res) {
    try {
      // Find one data
      let data = await laundry.findOne({ id: req.params.id });

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

  // Update laundry
  async update(req, res) {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: "No files were uploaded." });
      }
      if (req.files) {
        const file = req.files.image;

        // Make sure image is photo
        if (!file.mimetype.startsWith("image")) {
          return res.status(400).json({ message: "File must be an image." });
        }

        // Check file size (max 1MB)
        if (file.size > 1000000) {
          return res
            .status(400)
            .json({ message: "Image must be less than 1MB" });
        }

        // Create custom filename
        let fileName = crypto.randomBytes(16).toString("hex");

        // Rename the file
        file.name = `${fileName}${path.parse(file.name).ext}`;

        // assign req.body.image with file.name
        req.body.image = file.name;

        // Upload image to /public/images
        file.mv(`./public/images/${file.name}`, async (err) => {
          if (err) {
            console.error(err);

            return res.status(500).json({
              message: "Internal Server Error",
              error: err,
            });
          }
        });
      }

      // Update data
      let data = await laundry.findOneAndUpdate(
        {
          id: req.params.id,
        },
        req.body, // This is all of req.body
        {
          new: true,
        }
      );
      // new is to return the updated data
      // If no new, it will return the old data before updated

      // If success
      return res.status(201).json({
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

  async getAllLaundry(req, res) {
    try {
      let filter = {};
      let data = await paginate(
        laundry,
        attributes,
        filter,
        order,
        req.query.page,
        req.query.limit
      );

      if (data.total_data == 0) {
        return res.status(400).json({
          message: "Laundry not found",
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

  async getOneLaundry(req, res) {
    try {
      let allService = [];
      let washIron,
        wash,
        iron,
        dryClean,
        shoes,
        household,
        washIronBasic,
        washIronExpress,
        washBasic,
        washExpress,
        ironBasic,
        ironExpress,
        dryCleanBasic,
        shoesBasic,
        householdBasic;

      let dataItem11 = [];
      let dataItem12 = [];
      let dataItem21 = [];
      let dataItem22 = [];
      let dataItem31 = [];
      let dataItem32 = [];
      let dataItem41 = [];
      let dataItem51 = [];
      let dataItem61 = [];

      let min11 = [];
      let min12 = [];
      let min21 = [];
      let min22 = [];
      let min31 = [];
      let min32 = [];
      let min4 = [];
      let min5 = [];
      let min6 = [];

      await req.body.combineData.forEach((el) => {
        if (el.dataValues.servicelist.dataValues.id == 1) {
          if (el.dataValues.servicelevel.dataValues.id == 1) {
            if (el.item) {
              min11.push(el.price);
              dataItem11.push({
                id: el.dataValues.item.dataValues.id,
                name: el.dataValues.item.dataValues.clothes,
                price: el.price,
              });
            }
            washIronBasic = {
              id: 1,
              name: el.dataValues.servicelevel.dataValues.servicelevel,
              days: el.dataValues.servicelevel.dataValues.days,
              image:
                "/images/" + el.dataValues.servicelist.dataValues.imageBasic,
              byWeight: {
                price: el.price,
              },
              byItem: {
                minimumPrice: getMin(min11),
                item: dataItem11,
              },
            };
          } else {
            if (el.item) {
              min12.push(el.price);
              dataItem12.push({
                id: el.dataValues.item.dataValues.id,
                name: el.dataValues.item.dataValues.clothes,
                price: el.price,
              });
            }
            washIronExpress = {
              id: 2,
              name: el.dataValues.servicelevel.dataValues.servicelevel,
              days: el.dataValues.servicelevel.dataValues.days,
              image:
                "/images/" + el.dataValues.servicelist.dataValues.imageExpress,
              byWeight: {
                price: el.price,
              },
              byItem: {
                minimumPrice: getMin(min12),
                item: dataItem12,
              },
            };
          }
          washIron = {
            id: 1,
            name: el.dataValues.servicelist.dataValues.services,
            basic: washIronBasic,
            express: washIronExpress,
          };
        } else if (el.dataValues.servicelist.dataValues.id == 2) {
          if (el.dataValues.servicelevel.dataValues.id == 1) {
            if (el.item) {
              min21.push(el.price);
              dataItem21.push({
                id: el.dataValues.item.dataValues.id,
                name: el.dataValues.item.dataValues.clothes,
                price: el.price,
              });
            }
            washBasic = {
              id: 1,
              name: el.dataValues.servicelevel.dataValues.servicelevel,
              days: el.dataValues.servicelevel.dataValues.days,
              image:
                "/images/" + el.dataValues.servicelist.dataValues.imageBasic,
              byWeight: {
                price: el.price,
              },
              byItem: {
                minimumPrice: getMin(min21),
                item: dataItem21,
              },
            };
          } else {
            if (el.item) {
              min22.push(el.price);
              dataItem22.push({
                id: el.dataValues.item.dataValues.id,
                name: el.dataValues.item.dataValues.clothes,
                price: el.price,
              });
            }
            washExpress = {
              id: 2,
              name: el.dataValues.servicelevel.dataValues.servicelevel,
              days: el.dataValues.servicelevel.dataValues.days,
              image:
                "/images/" + el.dataValues.servicelist.dataValues.imageExpress,
              byWeight: {
                price: el.price,
              },
              byItem: {
                minimumPrice: getMin(min22),
                item: dataItem22,
              },
            };
          }
          wash = {
            id: 2,
            name: el.dataValues.servicelist.dataValues.services,
            basic: washBasic,
            express: washExpress,
          };
        } else if (el.dataValues.servicelist.dataValues.id == 3) {
          if (el.dataValues.servicelevel.dataValues.id == 1) {
            if (el.item) {
              min31.push(el.price);
              dataItem31.push({
                id: el.dataValues.item.dataValues.id,
                name: el.dataValues.item.dataValues.clothes,
                price: el.price,
              });
            }
            ironBasic = {
              id: 1,
              name: el.dataValues.servicelevel.dataValues.servicelevel,
              days: el.dataValues.servicelevel.dataValues.days,
              image:
                "/images/" + el.dataValues.servicelist.dataValues.imageBasic,
              byWeight: {
                price: el.price,
              },
              byItem: {
                minimumPrice: getMin(min31),
                item: dataItem31,
              },
            };
          } else {
            if (el.item) {
              min32.push(el.price);
              dataItem32.push({
                id: el.dataValues.item.dataValues.id,
                name: el.dataValues.item.dataValues.clothes,
                price: el.price,
              });
            }
            ironExpress = {
              id: 2,
              name: el.dataValues.servicelevel.dataValues.servicelevel,
              days: el.dataValues.servicelevel.dataValues.days,
              image:
                "/images/" + el.dataValues.servicelist.dataValues.imageExpress,
              byWeight: {
                price: el.price,
              },
              byItem: {
                minimumPrice: getMin(min32),
                item: dataItem32,
              },
            };
          }
          iron = {
            id: 3,
            name: el.dataValues.servicelist.dataValues.services,
            basic: ironBasic,
            express: ironExpress,
          };
        } else if (el.dataValues.servicelist.dataValues.id == 4) {
          if (el.dataValues.servicelevel.dataValues.id == 1) {
            if (el.item) {
              min4.push(el.price);
              dataItem41.push({
                id: el.dataValues.item.dataValues.id,
                name: el.dataValues.item.dataValues.clothes,
                price: el.price,
              });
            }
            dryCleanBasic = {
              id: 1,
              name: el.dataValues.servicelevel.dataValues.servicelevel,
              days: el.dataValues.servicelevel.dataValues.days,
              image:
                "/images/" + el.dataValues.servicelist.dataValues.imageBasic,
              byItem: {
                minimumPrice: getMin(min4),
                item: dataItem41,
              },
            };
          }
          dryClean = {
            id: 4,
            name: el.dataValues.servicelist.dataValues.services,
            basic: dryCleanBasic,
          };
        } else if (el.dataValues.servicelist.dataValues.id == 5) {
          if (el.dataValues.servicelevel.dataValues.id == 1) {
            if (el.item) {
              min5.push(el.price);
              dataItem51.push({
                id: el.dataValues.item.dataValues.id,
                name: el.dataValues.item.dataValues.clothes,
                price: el.price,
              });
            }
            shoesBasic = {
              id: 1,
              name: el.dataValues.servicelevel.dataValues.servicelevel,
              days: el.dataValues.servicelevel.dataValues.days,
              image:
                "/images/" + el.dataValues.servicelist.dataValues.imageBasic,
              byItem: {
                minimumPrice: getMin(min5),
                item: dataItem51,
              },
            };
          }
          shoes = {
            id: 5,
            name: el.dataValues.servicelist.dataValues.services,
            basic: shoesBasic,
          };
        } else {
          if (el.dataValues.servicelevel.dataValues.id == 1) {
            if (el.item) {
              min6.push(el.price);
              dataItem61.push({
                id: el.dataValues.item.dataValues.id,
                name: el.dataValues.item.dataValues.clothes,
                price: el.price,
              });
            }
            householdBasic = {
              id: 1,
              name: el.dataValues.servicelevel.dataValues.servicelevel,
              days: el.dataValues.servicelevel.dataValues.days,
              image:
                "/images/" + el.dataValues.servicelist.dataValues.imageBasic,
              byItem: {
                minimumPrice: getMin(min6),
                item: dataItem61,
              },
            };
          }
          household = {
            id: 6,
            name: el.dataValues.servicelist.dataValues.services,
            basic: householdBasic,
          };
        }
      });

      allService.push(washIron, wash, iron, dryClean, shoes, household);

      return res.status(200).json({
        message: "Success",
        data: {
          id: req.body.dataLaundry[0].dataValues.id,
          name: req.body.dataLaundry[0].dataValues.name,
          image: "/images/" + req.body.dataLaundry[0].dataValues.image,
          address: req.body.dataLaundry[0].dataValues.address,
          mobile_phone: req.body.dataLaundry[0].dataValues.mobile_phone,
          total_services: req.body.dataLaundry[0].dataValues.total_services,
          pickUpAndDelivery:
            req.body.dataLaundry[0].dataValues.pickUpAndDelivery,
          average_rating: req.body.dataLaundry[0].dataValues.average_rating,
          total_review: req.body.dataLaundry[0].dataValues.total_review,
          services: await getServices(allService),
        },
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  async searchLaundry(req, res) {
    try {
      if (Object.keys(req.query).includes("name")) {
        if (req.query.name.length > 0) {
          let filter = {
            name: {
              [Op.regexp]: req.query.name,
            },
          };
          let data = await paginate(
            laundry,
            attributes,
            filter,
            order,
            req.query.page,
            req.query.limit
          );

          if (data.total_data == 0) {
            return res.status(400).json({
              message: "Laundry not found",
            });
          } else {
            return res.status(200).json({
              message: "Success",
              data,
            });
          }
        } else {
          if (Object.keys(req.query).includes("deliver")) {
            if (req.body.laundry_id) {
              let filter = {
                id: {
                  [Op.or]: req.body.laundry_id,
                },
                pickUpAndDelivery: true,
              };
              let data = await paginate(
                laundry,
                attributes,
                filter,
                order,
                req.query.page,
                req.query.limit
              );

              if (data.total_data == 0) {
                return res.status(400).json({
                  message: "Laundry not found",
                });
              } else {
                return res.status(200).json({
                  message: "Success",
                  data,
                });
              }
            } else {
              let filter = {
                pickUpAndDelivery: true,
              };

              let data = await paginate(
                laundry,
                attributes,
                filter,
                order,
                req.query.page,
                req.query.limit
              );

              if (data.total_data == 0) {
                return res.status(400).json({
                  message: "Laundry not found",
                });
              } else {
                return res.status(200).json({
                  message: "Success",
                  data,
                });
              }
            }
          } else {
            let filter = {
              id: {
                [Op.or]: req.body.laundry_id,
              },
            };

            let data = await paginate(
              laundry,
              attributes,
              filter,
              order,
              req.query.page,
              req.query.limit
            );

            if (data.total_data == 0) {
              return res.status(400).json({
                message: "Laundry not found",
              });
            } else {
              return res.status(200).json({
                message: "Success",
                data,
              });
            }
          }
        }
      } else {
        if (Object.keys(req.query).includes("deliver")) {
          if (req.body.laundry_id) {
            let filter = {
              id: {
                [Op.or]: req.body.laundry_id,
              },
              pickUpAndDelivery: true,
            };
            let data = await paginate(
              laundry,
              attributes,
              filter,
              order,
              req.query.page,
              req.query.limit
            );

            if (data.total_data == 0) {
              return res.status(400).json({
                message: "Laundry not found",
              });
            } else {
              return res.status(200).json({
                message: "Success",
                data,
              });
            }
          } else {
            let filter = {
              pickUpAndDelivery: true,
            };

            let data = await paginate(
              laundry,
              attributes,
              filter,
              order,
              req.query.page,
              req.query.limit
            );

            if (data.total_data == 0) {
              return res.status(400).json({
                message: "Laundry not found",
              });
            } else {
              return res.status(200).json({
                message: "Success",
                data,
              });
            }
          }
        } else {
          let filter = {
            id: {
              [Op.or]: req.body.laundry_id,
            },
          };

          let data = await paginate(
            laundry,
            attributes,
            filter,
            order,
            req.query.page,
            req.query.limit
          );

          if (data.total_data == 0) {
            return res.status(400).json({
              message: "Laundry not found",
            });
          } else {
            return res.status(200).json({
              message: "Success",
              data,
            });
          }
        }
      }
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
}

module.exports = new LaundryController();

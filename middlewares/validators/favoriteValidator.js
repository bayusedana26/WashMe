const validator = require("validator");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { laundry, user, favorite } = require("../../db/models");

// module.exports.getOne = async (req, res, next) => {
//   try {
//     // Find favorite
//     let findData = await favorite.findOne({
//       where: {
//         id: req.params.id,
//       },
//     });

//     let errors = [];

//     // user not found
//     if (!findData) {
//       errors.push("Please Choose Laundry");
//     } else {
//       if (data.dataValues.user_id != req.user.id) {
//         return res.status(403).json({
//           message: "Forbidden access",
//         });
//       }
//     }

//     // If errors length > 0, it will make errors message
//     if (errors.length > 0) {
//       // Because bad request
//       return res.status(400).json({
//         message: errors.join(", "),
//       });
//     }

//     // It means that will be go to the next middleware
//     next();
//   } catch (e) {
//     return res.status(500).json({
//       message: "Internal Server Error",
//       error: e,
//     });
//   }
// };

module.exports.create = async (req, res, next) => {
  const errors = [];
  try {
    // Find Saved Laundry Data
    const findData = await favorite.findOne({
      where: { body: req.body },
    });
    if (!findData) {
      errors.push("No Data Found");
    }
    // If error
    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    next();
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Internal Server Error in Validator",
    });
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    let data = await favorite.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!data) {
      return res.status(400).json({
        message: "Favorite not found",
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
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};

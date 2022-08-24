const path = require ("path")
const Sequelize = require("sequelize")
const Op = Sequelize.Op
const {
  user,
  item,
  itemprice,  
  order,
  orderstatus,
  ordertype,
  servicelevel,
  servicelist,
  weightprice,
} = require("../db/models");
 

// async function finditemprice(servicelist, servicelevel) {
// let cleanData = []
// let findData = await itemprice.findAll({
//   where: {
//     servicelist_id: {
//       [Op.or]: servicelist,
//     },
//     servicelevel_id: {
//     [Op.or]: servicelevel,
//     },
//   },
// })

// await findData.forEach({el, index} => {
//   cleanData.push(el.dataValues.user_id)
// })

// return cleanData.filter({val,i} => cleanData.indexOf(val)===i)



class UserController {
  async getService(req, res) {
    try {
      let findData = await Promise.all([
        servicelist.findAll({where: {user_id: req.params.id}}),
        // servicelevel.findAll({where: {user_id: req.params.id}}),
        // itemprice.findAll({where: {user_id: req.params.id}}),
        // weightprice.findAll({where: {user_id: req.params.id}}),
        
      ]);
      if (findData[0].length == 0) {
        return res.status(404).json({
          message: "Service List not found",
        });
      // }
      //   if (findData[1].length == 0) {
      //     return res.status(404).json({
      //       message: "Service Level not found",
      //     });
      //   }
      //     if (findData[2].length == 0) {
      //       return res.status(404).json({
      //         message: "Item price not found",
      //       });  
      //     }
      //       if (findData[3].length == 0) {
      //         return res.status(404).json({
      //           message: "Weight price not found",
      //         });
            // }
      }else{
      // If success
      return res.status(200).json({
        message: "Success",
        data:findData[0],
      });
    }
  } catch (e) {
      // If error
      console.log("error service", e)
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }  
        
  // async getStatus(req, res) {
  //   try {
  //     let data = await order.findOne({
  //       where: { id: req.params.id },
  //       atributes: ["estimateFinish"],
  //       include: [
  //         {
  //           model: orderstatus,
  //           attributes: ["status"],
  //         },
  //         { model: user, attributes: ["name"] },
  //       ],
  //       // if data is nothing
  //     });
  //     if (data.length === 0) {
  //       return res.status(404).json({
  //         message: "Progress not found",
  //       });
  //     }
  //     // If success
  //     return res.status(200).json({
  //       message: "Success",
  //       data,
  //     });
  //   } catch (e) {
  //     // If error
  //     console.log("test error 500", e)
  //     return res.status(500).json({
  //       message: "Internal Server Error",
  //       error: e,
  //     });
  //   }
  // }
  }
}
module.exports =  new UserController()

const path = require("path");
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
} = require("../db/models");
const midtransClient = require("midtrans-client");

class OrderController {
  //On Process Status
  async getOrderStatus(req, res) {
    try {
      let data = await order.findAll({
        where: {
          user_id: req.user.id,
          orderstatus_id: {
            [Op.or]: ["1", "2", "3", "4", "5", "6", "7"],
          },
        },
        order: [["createdAt", "DESC"]],
        attributes: [
          "id",
          "item",
          "weight",
          "createdAt",
          "estimateFinish",
          "totalPrice",
          "estimatePrice",
          "admin_charge",
          "delivery_fee",
          "deliveryAddress",
          "pickUpAddress",
          "paymentType",
          // For Midtrans
          "token",
          "redirect_url",
          "expiredPayment",
          "online_payment",
        ],
        include: [
          {
            model: laundry,
            attributes: ["id", "name"],
          },
          {
            model: servicelist,
            attributes: ["id", "services"],
          },
          {
            model: orderstatus,
            attributes: ["id", "status"],
          },
        ],
      });

      if (data.length == 0) {
        return res.status(400).json({
          message: "You don't have any order",
        });
      } else {
        return res.status(200).json({
          message: "Success",
          data,
        });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  // Completed / Finish Order
  async getFinishStatus(req, res) {
    try {
      let data = await order.findAll({
        where: {
          user_id: req.user.id,
          orderstatus_id: {
            [Op.or]: ["8"],
          },
        },
        order: [["createdAt", "DESC"]],
        attributes: [
          "id",
          "item",
          "weight",
          "createdAt",
          "estimateFinish",
          "totalPrice",
          "estimatePrice",
          "admin_charge",
          "delivery_fee",
          "deliveryAddress",
          "pickUpAddress",
          "paymentType",
        ],
        include: [
          {
            model: laundry,
            attributes: ["id", "name"],
          },
          {
            model: servicelist,
            attributes: ["id", "services"],
          },
          {
            model: orderstatus,
            attributes: ["id", "status"],
          },
        ],
      });

      if (data.length == 0) {
        return res.status(400).json({
          message: "You don't have finished laundry",
        });
      } else {
        return res.status(200).json({
          message: "Your Laundry Is Finished",
          paymentStatus: "Paid",
          data,
        });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  async create(req, res) {
    try {
      let createOrder = await order.create({
        user_id: req.user.id,
        laundry_id: req.body.laundry_id,
        ordertype_id: req.body.ordertype_id,
        servicelist_id: req.body.servicelist_id,
        servicelevel_id: req.body.servicelevel_id,
        weight: req.body.weight,
        item: req.body.item,
        estimateFinish: req.body.estimateFinish,
        estimatePrice: req.body.estimatePrice,
        pickUpChoice: req.body.pickUpChoice,
        pickUpAddress: req.body.pickUpAddress,
        deliveryAddress: req.body.deliveryAddress,
        delivery_fee: req.body.delivery_fee,
        admin_charge: req.body.admin_charge,
        totalPrice: req.body.totalPrice,
        paymentStatus: "Unpaid",
        paymentImage: null,
        paymentType: req.body.paymentType,
        orderstatus_id: "1",
        online_payment: req.body.online_payment,
        token: req.body.token,
        redirect_url: req.body.redirect_url,
        expiredPayment: new Date(Date.now() + 2 * 60 * 60 * 1000),
      });

      // Only for Debit / E-Wallet Payment
      if (
        req.body.paymentType == "Debit/credit card" ||
        req.body.paymentType == "E-wallet"
      ) {
        // Connecting Order to Create Midtrans
        let snap = new midtransClient.Snap({
          // Set to true if you want Production Environment (accept real transaction).
          isProduction: false,
          serverKey: process.env.MIDTRANS_SERVER_KEY,
        });

        let parameter = {
          transaction_details: {
            order_id: createOrder.id,
            gross_amount: req.body.totalPrice,
          },
          customer_details: {
            email: req.user.email,
          },
          credit_card: {
            secure: true,
          },
          callbacks: {
            finish: "https://wash-me.herokuapp.com/",
          },
          expiry: {
            unit: "minutes",
            duration: 120,
          },
        };

        let midtrans = await snap.createTransaction(parameter);

        // Connect to token and redirect_url
        await order.update(
          {
            token: midtrans.token,
            redirect_url: midtrans.redirect_url,
          },
          { where: { id: createOrder.id } }
        );

        return res.status(201).json({
          message: "Order created successfully",
          createOrder,
          midtrans,
        });
      }
      // If Cash
      if (req.body.paymentType == "Cash") {
        return res.status(201).json({
          message: "Order created successfully",
          createOrder,
        });
      }
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  async handlePayment(req, res) {
    try {
      let orderId = req.body.order_id;
      let transactionStatus = req.body.transaction_status;
      let fraudStatus = req.body.fraud_status;
      let data;

      console.log(
        `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`
      );

      // Sample transactionStatus handling logic

      if (transactionStatus == "capture") {
        if (fraudStatus == "challenge") {
          // TODO set transaction status on your database to 'challenge'
          // and response with 200 OK
          data = await order.update(
            {
              online_payment: "Success",
              expiredPayment: null,
            },
            { where: { id: orderId } }
          );
        } else if (fraudStatus == "accept") {
          // TODO set transaction status on your database to 'success'
          // and response with 200 OK
          data = await order.update(
            {
              online_payment: "Success",
              expiredPayment: null,
            },
            { where: { id: orderId } }
          );
        }
      } else if (transactionStatus == "settlement") {
        // TODO set transaction status on your database to 'success'
        // and response with 200 OK
        data = await order.update(
          {
            online_payment: "Success",
            expiredPayment: null,
          },
          { where: { id: orderId } }
        );
      } else if (
        transactionStatus == "cancel" ||
        transactionStatus == "deny" ||
        transactionStatus == "expire"
      ) {
        // TODO set transaction status on your database to 'failure'
        // and response with 200 OK
        data = await order.update(
          {
            online_payment: "Failed",
          },
          { where: { id: orderId } }
        );
      } else if (transactionStatus == "pending") {
        // TODO set transaction status on your database to 'pending' / waiting payment
        // and response with 200 OK
        data = await order.update(
          {
            online_payment: "Pending",
          },
          { where: { id: orderId } }
        );
      }
      // Find one data
      data = await order.findOne({
        where: {
          user_id: req.user.id,
          id: orderId,
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
          // For Midtrans
          "token",
          "redirect_url",
          "expiredPayment",
          "online_payment",
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
            attributes: ["id", "services"],
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
      return res.status(200).json({
        message: "Success",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error,
      });
    }
  }

  // Get all order data
  async getAllOrder(req, res) {
    try {
      let data = await Promise.all([
        order.findAll({
          where: {
            user_id: req.user.id,
            orderstatus_id: {
              [Op.or]: ["1", "2", "3", "4", "5", "6", "7"],
            },
          },
          attributes: [
            "id",
            "item",
            "weight",
            "createdAt",
            "estimateFinish",
            "totalPrice",
            "estimatePrice",
            "delivery_fee",
            "deliveryAddress",
            "pickUpAddress",
            // For midtrans
            "token",
            "redirect_url",
            "expiredPayment",
            "online_payment",
            "paymentType",
          ],
          include: [
            {
              model: laundry,
              attributes: ["id", "name"],
            },
            {
              model: servicelist,
              attributes: ["id", "services"],
            },
            {
              model: orderstatus,
              attributes: ["id", "status"],
            },
          ],
        }),
      ]);

      if (data.length == 0) {
        return res.status(400).json({
          message: "Order Not Found",
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

  // Get Order
  async getOneOrder(req, res) {
    try {
      let service;
      //console.log(req.body.order.dataValues.id);
      //console.log(req.body.order.dataValues.laundry.dataValues);
      //console.log(req.body.order.dataValues.laundry.dataValues.courier.dataValues.name);
      if (req.body.order.dataValues.servicelevel.dataValues.id == 1) {
        service = {
          id: req.body.order.dataValues.servicelist.dataValues.id,
          name: req.body.order.dataValues.servicelist.dataValues.services,
          level: {
            id: req.body.order.dataValues.servicelevel.dataValues.id,
            name: req.body.order.dataValues.servicelevel.dataValues
              .servicelevel,
            image:
              "/images/" +
              req.body.order.dataValues.servicelist.dataValues.imageBasic,
          },
        };
      } else {
        service = {
          id: req.body.order.dataValues.servicelist.dataValues.id,
          name: req.body.order.dataValues.servicelist.dataValues.services,
          level: {
            id: req.body.order.dataValues.servicelevel.dataValues.id,
            name: req.body.order.dataValues.servicelevel.dataValues
              .servicelevel,
            image:
              "/images/" +
              req.body.order.dataValues.servicelist.dataValues.imageExpress,
          },
        };
      }

      return res.status(200).json({
        message: "Success",
        data: {
          id: req.body.order.dataValues.id,
          weight: req.body.order.dataValues.weight,
          item: req.body.order.dataValues.item,
          estimateFinish: req.body.order.dataValues.estimateFinish,
          estimatePrice: req.body.order.dataValues.estimatePrice,
          pickUpAddress: req.body.order.dataValues.pickUpAddress,
          deliveryAddress: req.body.order.dataValues.deliveryAddress,
          delivery_fee: req.body.order.dataValues.delivery_fee,
          admin_charge: req.body.order.dataValues.admin_charge,
          totalPrice: req.body.order.dataValues.totalPrice,
          paymentType: req.body.order.dataValues.paymentType,
          laundry: {
            id: req.body.order.dataValues.laundry.dataValues.id,
            name: req.body.order.dataValues.laundry.dataValues.name,
          },
          courier:
            req.body.order.dataValues.laundry.dataValues.courier.dataValues
              .name,
          ordertype: {
            id: req.body.order.dataValues.ordertype.dataValues.id,
            name: req.body.order.dataValues.ordertype.dataValues.types,
          },
          service: service,
          orderstatus: {
            id: req.body.order.dataValues.orderstatus.dataValues.id,
            name: req.body.order.dataValues.orderstatus.dataValues.status,
          },
          createdAt: req.body.order.dataValues.createdAt,
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

  // Update order
  async update(req, res) {
    let update = {
      orderstatus_id: req.body.orderstatus_id,
      deliveryAddress: req.body.deliveryAddress,
      weight: req.body.weight,
      totalPrice: req.body.finalPrice,
    };

    try {
      // Find the updated order
      let data = await order.update(update, {
        where: { id: req.params.id },
        attributes: [
          // "id",
          "weight",
          "totalPrice",
          "orderstatus",
          [("createdAt", "waktu")],
        ],
      });

      // If success
      return res.status(201).json({
        message: "Success",
        data,
        // updatedOrder,
      });
    } catch (e) {
      // If error
      console.log("update", e);
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
  // Delete Order (Admin Only)
  async delete(req, res) {
    try {
      // Delete data
      let data = await order.destroy({ where: { id: req.params.id } });

      // If data deleted is null
      if (!data) {
        return res.status(404).json({
          message: "Order Not Found",
        });
      }

      // If success
      return res.status(200).json({
        message: "Success delete order",
      });
    } catch (e) {
      // If error
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
}

module.exports = new OrderController();

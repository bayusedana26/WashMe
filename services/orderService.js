const { order, laundry, servicelist, orderstatus } = require("../db/models");
const ApiError = require("../utils/ApiError");

class OrderService {
  async getOrderStatus(userId) {
    const orders = await order.findAll({
      where: {
        user_id: userId,
        orderstatus_id: ["1", "2", "3", "4", "5", "6", "7"],
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

    if (!orders.length) {
      throw new ApiError(404, "You don't have any order");
    }

    return orders;
  }

  async deleteOrder(orderId) {
    const deletedOrder = await order.destroy({
      where: { id: orderId },
    });

    if (!deletedOrder) {
      throw new ApiError(404, "Order Not Found");
    }

    return deletedOrder;
  }

  async updateOrderPaymentStatus(orderId, paymentStatus) {
    const updateData = this._getPaymentStatusUpdateData(paymentStatus);
    
    await order.update(updateData, {
      where: { id: orderId }
    });

    return this._getUpdatedOrder(orderId);
  }

  _getPaymentStatusUpdateData(status) {
    const baseUpdate = {
      online_payment: status
    };

    if (status === "Success") {
      return {
        ...baseUpdate,
        expiredPayment: null
      };
    }

    return baseUpdate;
  }

  async _getUpdatedOrder(orderId) {
    return order.findOne({
      where: { id: orderId },
      attributes: [/* ... */],
      include: [/* ... */]
    });
  }
}

module.exports = new OrderService(); 
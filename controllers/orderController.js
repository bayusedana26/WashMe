const orderService = require('../services/orderService');
const catchAsync = require('../utils/catchAsync');

class OrderController {
  getOrderStatus = catchAsync(async (req, res) => {
    const orders = await orderService.getOrderStatus(req.user.id);
    
    res.status(200).json({
      message: "Success",
      data: orders
    });
  });

  delete = catchAsync(async (req, res) => {
    await orderService.deleteOrder(req.params.id);
    
    res.status(200).json({
      message: "Success delete order"
    });
  });

  handlePayment = catchAsync(async (req, res) => {
    const { order_id: orderId, transaction_status: transactionStatus } = req.body;
    
    const updatedOrder = await orderService.updateOrderPaymentStatus(
      orderId, 
      this._mapTransactionStatus(transactionStatus)
    );

    res.status(200).json({
      message: "Success",
      data: updatedOrder
    });
  });

  _mapTransactionStatus(status) {
    const statusMap = {
      capture: "Success",
      settlement: "Success",
      pending: "Pending",
      deny: "Failed",
      cancel: "Failed",
      expire: "Failed"
    };

    return statusMap[status] || "Failed";
  }
}

module.exports = new OrderController();

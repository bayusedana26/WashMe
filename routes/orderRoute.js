const express = require("express"); // Import express
const router = express.Router(); // Make a router

// Import auth
const customerAuth = require("../middlewares/auth/customerAuth");
const laundryAuth = require("../middlewares/auth/laundryAuth");

const orderValidator = require("../middlewares/validators/orderValidator");

const search = require("../middlewares/search/index");

// Import controller
const orderController = require("../controllers/orderController");

router.post("/handlePayment", orderController.handlePayment);

router.get("/status/", customerAuth.customer, orderController.getOrderStatus);

router.get(
  "/statusfinish/",
  customerAuth.customer,
  orderController.getFinishStatus
);

router.put(
  "/orderupdate/:id",
  /*laundryAuth.laundry,*/ orderValidator.update,
  orderController.update
);
router.delete(
  "/orderdelete/:id",
  /*laundryAuth.laundry,*/ orderValidator.delete,
  orderController.delete
);
router.get(
  "/:id",
  customerAuth.customer,
  search.getOrder,
  orderController.getOneOrder
);
router.get("/", customerAuth.customer, orderController.getAllOrder);
router.post(
  "/create",
  customerAuth.customer,
  orderValidator.create,
  orderController.create
);

module.exports = router; // Export router

const express = require("express");

const utilsController = require("../controllers/utilsContoller");

const router = express.Router();

router.get("/services", utilsController.getAllServices);
router.get("/items", utilsController.getAllItems);
router.get("/levels", utilsController.getAllLevels);
router.get("/types", utilsController.getAllTypes);
router.get("/orderstatus", utilsController.getAllOrderStatus);

module.exports = router;
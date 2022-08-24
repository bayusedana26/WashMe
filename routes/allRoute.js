const express = require("express");
const router = express.Router();

// Import all routes
const customer = require("./customerRoute");
const laundry = require("./laundryRoute");
const order = require("./orderRoute");
const utils = require("./utilsRoute");
const list = require("./listRoute");
const favorite = require("./favoriteRoute");

// Use routes
router.use("/", customer);
router.use("/", laundry);
router.use("/order", order);
router.use("/", utils);
router.use("/list", list);
router.use("/", favorite);

module.exports = router;



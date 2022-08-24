const express = require("express");

// Import validator
const favoriteValidator = require("../middlewares/validators/favoriteValidator");

// Import Controller
const favoriteController = require("../controllers/favoriteController");

// Import customer auth
const customerAuth = require("../middlewares/auth/customerAuth");

const router = express.Router();

router.post(
  "/favorite/add",
  customerAuth.customer,
  /*favoriteValidator.create,*/ favoriteController.create
);

router.get("/favorite", customerAuth.customer, favoriteController.getAll);

router.delete(
  "/favorite/:id",
  customerAuth.customer,
  favoriteValidator.delete,
  favoriteController.delete
);

module.exports = router;

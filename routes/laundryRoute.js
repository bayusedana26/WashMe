const express = require("express");

// Import validator
const laundryValidator = require("../middlewares/validators/laundryAuthValidator");
const validator = require("../middlewares/validators/laundryValidator");

// Import Controller
const laundryAuthController = require("../controllers/laundryAuthController");
const laundryController = require("../controllers/laundryController");

// Import customer auth
const laundryAuth = require("../middlewares/auth/laundryAuth");
const customerAuth = require("../middlewares/auth/customerAuth");

// import search middleware
const search = require("../middlewares/search/index");

const router = express.Router();

router.post(
  "/register/laundry",
  laundryValidator.signup,
  laundryAuth.signup,
  laundryAuthController.getToken
);

// If user access /auth/signin (POST)
router.post(
  "/login/laundry",
  laundryValidator.signin,
  laundryAuth.signin,
  laundryAuthController.getToken
);

router.get(
  "/laundry",
  customerAuth.customer,
  validator.paginate,
  laundryController.getAllLaundry
);
router.get(
  "/search",
  customerAuth.customer,
  validator.paginate,
  validator.searchLaundry,
  search.findLaundryId,
  laundryController.searchLaundry
);
router.get(
  "/details/:id",
  customerAuth.customer,
  validator.getOneLaundry,
  search.getAllServices,
  laundryController.getOneLaundry
);

module.exports = router;

const express = require("express"); // Import express
const router = express.Router(); // Make a router

// Import middlewares
// const barangValidator = require("../middlewares/validators/barangValidator");

// Import controller
const userController = require("../controllers/userController");

router.get("/service/:id", userController.getService);
// router.get("/:id", userController.getStatus);


module.exports = router; // Export router

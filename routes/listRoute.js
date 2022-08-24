const express = require("express");

const listValidator = require("../middlewares/validators/listValidator");
const listController = require("../controllers/listController");
const customerAuth = require("../middlewares/auth/customerAuth");
const search = require("../middlewares/search/index");

const router = express.Router();

router.post("/add", customerAuth.customer, listValidator.create, listController.create);
router.get("/", customerAuth.customer, search.getAllList, listController.getAll);
router.delete("/delete/:id", customerAuth.customer, listValidator.delete,listController.delete);

module.exports = router;

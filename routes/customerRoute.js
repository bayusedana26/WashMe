const express = require("express");

// Import validator
const customerValidator = require("../middlewares/validators/customerAuthValidator");
const readUpdateValidator = require("../middlewares/validators/customerValidator");

// Import Controller
const customerAuthController = require("../controllers/customerAuthController");
const customerController = require("../controllers/customerController");

// Import customer auth
const customerAuth = require("../middlewares/auth/customerAuth");

//Import for google auth
const passport = require("passport");
const login = require("../middlewares/google/googleValidator");
require("../middlewares/google/google");

const router = express.Router();

router.get(
  "/customer/verify",
  customerAuth.verify,
  (req, res) => {
    res.redirect("http://wash-me.herokuapp.com/");
  },
  customerAuthController.getToken
);

router.post(
  "/register/customer",
  customerValidator.signup,
  customerAuth.signup,
  customerAuthController.register
);

// If user access /auth/signin (POST)
router.post(
  "/login/customer",
  customerValidator.signin,
  customerAuth.signin,
  customerAuthController.getToken
);

router.get(
  "/customer/:id",
  customerAuth.customer,
  readUpdateValidator.getOne,
  customerController.getOne
);
router.put(
  "/customer/:id",
  customerAuth.customer,
  customerValidator.update,
  customerController.update
);

// Google Oauth
router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["email", "profile"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: process.env.OAUTH_CALLBACK_FRONTEND + "/auth/signin",
  }),
  customerAuthController.oauth
);

// Kalo Pake Session
// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "/google/success",
//     failureRedirect: "/google/failure",
//   })
// );

// // If success
// router.get("/google/success", login.loggedIn, customerAuthController.oauth);
// // If failure
// router.get("/google/failure", (req, res) => res.send("Hayo lo error"));

// // If logged out
// router.get("/logout", (req, res) => {
//   req.session = null;
//   req.logout;
//   res.redirect("/home");
// });
// router.get("/home", (req, res) => res.send("You've logged out"));

module.exports = router;

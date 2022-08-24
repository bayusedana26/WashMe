const { user } = require("../../db/models");

module.exports.loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(400);
  }
};

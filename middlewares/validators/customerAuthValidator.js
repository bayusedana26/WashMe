const validator = require("validator");

module.exports.signup = async (req, res, next) => {
  let errors = [];
  try {
    // if (validator.isNumeric(req.body.name)) {
    //   errors.push("Please input valid letters");
    // }
    if (!validator.isEmail(req.body.email)) {
      errors.push("Please input valid email");
    }
    if (!validator.isStrongPassword(req.body.password)) {
      errors.push(
        "Password must have minimum length of 8 characters with minimum 1 lowercase character, 1 uppercase character, 1 number and 1 symbol"
      );
    }
    if (Object.keys(req.body).includes("confirmpassword")) {
      if (req.body.confirmpassword !== req.body.password) {
        errors.push("Password confirmation must be the same with password");
      }
    }

    // if (req.body.confirmpassword !== req.body.password) {
    //   errors.push("Password confirmation must be the same with password");
    // }

    // if (!validator.isMobilePhone(req.body.mobile_phone, ["id-ID"])) {
    //   errors.push("Please input valid phone number");
    // }
    // if (validator.isAlphanumeric(req.body.address)) {
    //   errors.push("Please input full address");
    // }

    // If errors length > 0, it will make errors message
    if (errors.length > 0) {
      // Because bad request
      return res.status(400).json({
        message: errors.join(", and "),
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }

  // It means that will be go to the next middleware
  next();
};

module.exports.signin = async (req, res, next) => {
  let errors = [];
  try {
    if (!validator.isEmail(req.body.email)) {
      errors.push("Please input valid email");
    }
    if (!validator.isStrongPassword(req.body.password)) {
      errors.push(
        "Password must have minimum length of 8 characters with minimum 1 lowercase character, 1 uppercase character, 1 number and 1 symbol"
      );
    }

    // If errors length > 0, it will make errors message
    if (errors.length > 0) {
      // Because bad request
      return res.status(400).json({
        message: errors.join(", and "),
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
  // It means that will be go to the next middleware
  next();
};

module.exports.update = async (req, res, next) => {
  let errors = [];
  try {
    // Validator Name
    if (validator.isNumeric(req.body.name)) {
      errors.push("Please input valid letters");
    }
    // Validator mobile_phone
    if (!validator.isMobilePhone(req.body.mobile_phone, ["id-ID"])) {
      errors.push("Please input valid phone number");
    }
    // If errors length > 0, it will make errors message
    if (errors.length > 0) {
      // Because bad request
      return res.status(400).json({
        message: errors.join(", and "),
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message,
    });
  }

  // It means that will be go to the next middleware
  next();
};

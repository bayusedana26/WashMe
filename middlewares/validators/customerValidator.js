const { user } = require("../../db/models"); // Import all models
const validator = require("validator");

module.exports.getOne = async (req, res, next) => {
  try {
    // Find user
    let findUser = await user.findOne({
      where: {
        id: req.params.id,
      },
    });

    let errors = [];

    // user not found
    if (!findUser) {
      errors.push("Customer Not Found");
    }

    // If errors length > 0, it will make errors message
    if (errors.length > 0) {
      // Because bad request
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    // It means that will be go to the next middleware
    next();
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};

module.exports.update = async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No files were uploaded." });
    }
    if (req.files) {
      const file = req.files.image;

      // Make sure image is photo
      if (!file.mimetype.startsWith("image")) {
        return res.status(400).json({ message: "File must be an image." });
      }

      // Check file size (max 1MB)
      if (file.size > 1000000) {
        return res.status(400).json({ message: "Image must be less than 1MB" });
      }

      // Create custom filename
      let fileName = crypto.randomBytes(16).toString("hex");

      // Rename the file
      file.name = `${fileName}${path.parse(file.name).ext}`;

      // assign req.body.image with file.name
      req.body.image = file.name;

      // Upload image to /public/images
      file.mv(`./public/images/${file.name}`, async (err) => {
        if (err) {
          console.error(err);

          return res.status(500).json({
            message: "Internal Server Error",
            error: err,
          });
        }
      });
    }
    next();
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};

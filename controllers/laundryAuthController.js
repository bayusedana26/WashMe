const jwt = require("jsonwebtoken");

class AuthController {
  async getToken(req, res) {
    try {
      const body = {
        laundry: {
          id: req.laundry.id,
          email: req.laundry.email,
        },
      };

      const token = jwt.sign(body, process.env.JWT_SECRET);
      const id = body.laundry.id;
      const email = body.laundry.email;
      return res.status(200).json({
        message: "Success",
        token,
        id,
        email,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
}

module.exports = new AuthController();

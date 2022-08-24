const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const fs = require("fs");
let mailVerify = fs.readFileSync(__dirname + "/WashMe.html", {
  encoding: "utf-8",
});
const { user } = require("../db/models");

class AuthController {
  async getToken(req, res) {
    try {
      const body = {
        user: {
          id: req.user.id,
          email: req.user.email,
        },
      };

      const token = jwt.sign(body, process.env.JWT_SECRET);
      const id = body.user.id;
      const email = req.user.email;

      // If try to login without verification
      if (req.user.status != "Active") {
        console.log(req.user.status);
        return res.status(401).send({
          message: "Pending Account. Please Verify Your Email!",
          // url: `http://localhost:3000/customer/verify?token=${token}`,
        });
      }
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

  // Register Customer
  async register(req, res) {
    try {
      const body = {
        user: {
          id: req.user.id,
          email: req.user.email,
        },
      };

      const token = jwt.sign(body, process.env.JWT_SECRET, {
        expiresIn: "60d",
      });
      // Nodemailer 57-86
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },

        authentication: "plain",
        address: "smtp.gmail.com",
        port: 587,
      });
      mailVerify = mailVerify.replace(
        "Verify_endpoint",
        process.env.VERIFY_URL + "?token=" + token
      );

      let mailOptions = {
        from: "no-reply@washme.com",
        to: `${req.user.email}`,
        subject: "Email Registration for Customer",
        html: mailVerify,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      const id = body.user.id;
      const email = req.user.email;
      return res.status(200).json({
        message: "Please check your email for verification",
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

  // For google oauth
  async oauth(req, res, next) {
    try {
      // Get the req.user that has been created in the authRoutes
      // And create body variable
      const body = {
        user: {
          id: req.user.dataValues.id,
        },
      };

      // Create jwt token with { user: { id: req.user._id } } value
      // And the key is process.env.JWT_SECRET
      const token = jwt.sign(body, process.env.JWT_SECRET, {
        expiresIn: "60d",
      });

      if (req.user.method === "oauth") {
        return res.redirect(
          process.env.OAUTH_CALLBACK_FRONTEND + "/signin?token=" + token
        );
      }

      // If success
      return res.status(200).json({
        message: "Success",
        token,
      });
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = new AuthController();

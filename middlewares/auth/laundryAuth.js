const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const { laundry } = require("../../db/models");
const nodemailer = require("nodemailer");

passport.serializeUser(function (laundry, done) {
  done(null, laundry.id);
});

passport.deserializeUser(function (id, done) {
  // laundry.findById(id, function (err, laundry) {
  //   done(err, laundry);
  // });
  done(null, laundry.id);
});

module.exports.signup = (req, res, next) => {
  // It will go to ../middlewares/auth/index.js -> passport.use("signup")
  passport.authenticate("registerLaundry", (err, laundry, info) => {
    // If error
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err,
      });
    }

    // If laundry is false
    if (!laundry) {
      return res.status(401).json({
        message: info.message,
      });
    }

    // Make req.laundry that will be save the user value
    // And it will bring to controller
    req.laundry = laundry;

    // Next to authController.getToken
    next();
  })(req, res, next);
};

passport.use(
  "registerLaundry",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        let laundryRegister = await laundry.create(req.body);

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

        let mailOptions = {
          from: "no-reply@washme.com",
          to: email,
          subject: "Sending Email Registration for Laundry",
          text: `Welcome to Wash Me! ${email} Hope you can get many customer`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        return done(null, laundryRegister, transporter, {
          message: "laundry can be created",
        });
      } catch (e) {
        console.log(e);
        return done(null, false, {
          message: "laundry can't be created",
        });
      }
    }
  )
);

exports.signin = (req, res, next) => {
  // It will go to ../middlewares/auth/index.js -> passport.use("signin")
  passport.authenticate(
    "signinLaundry",
    { session: false },
    (err, laundry, info) => {
      // If error
      if (err) {
        return next(err);
      }

      // If laundry is false
      if (!laundry) {
        return next({ message: info.message, statusCode: 401 });
      }

      req.laundry = laundry;

      // Next to authController.getToken
      next();
    }
  )(req, res, next);
};

// If user call this passport
passport.use(
  "signinLaundry",
  new LocalStrategy(
    {
      usernameField: "email", // usernameField is come from req.body.email
      passwordField: "password", // passwordField is come from req.body.password
      passReqToCallback: true, // enable to read req.body/req.params/req.query
    },
    async (req, email, password, done) => {
      try {
        let laundrySignin = await laundry.findOne({ where: { email } });

        // If laundry doesn't exist
        if (!laundrySignin) {
          return done(null, false, {
            message: "Email not found",
          });
        }

        // If user exist
        let validate = await bcrypt.compare(password, laundrySignin.password);

        // If password is wrong
        if (!validate) {
          return done(null, false, {
            message: "Wrong password",
          });
        }

        return done(null, laundrySignin, {
          message: "Laundry can sign in",
        });
      } catch (e) {
        console.log(e);

        return done(null, false, {
          message: "Laundry can't sign in",
        });
      }
    }
  )
);

exports.admin = (req, res, next) => {
  // It will go to ../middlewares/auth/index.js -> passport.use("signup")
  passport.authorize("adminLaundry", (err, laundry, info) => {
    // If error
    if (err) {
      return next(err);
    }

    // If laundry is false
    if (!laundry) {
      return next({ message: info.message, statusCode: 403 });
    }

    // Make req.laundry that will be save the laundry value
    // And it will bring to controller
    req.laundry = laundry;

    // Next to authController.getToken
    next();
  })(req, res, next);
};

passport.use(
  "adminLaundry",
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET, // JWT Key
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // Get token from bearer
    },
    async (token, done) => {
      try {
        // Find laundry
        const laundryLogin = await laundry.findOne({
          where: { id: token.laundry.id },
        });

        // If  is admin
        if (laundryLogin.role.includes("admin")) {
          return done(null, token.laundry);
        }

        return done(null, false, {
          message: "You're not authorized",
        });
      } catch (e) {
        return done(null, false, {
          message: "You're not authorized",
        });
      }
    }
  )
);

exports.laundry = (req, res, next) => {
  // It will go to ../middlewares/auth/index.js -> passport.use("signup")
  passport.authorize("laundry", (err, laundry, info) => {
    // If error
    if (err) {
      return next(err);
    }

    // If user is false
    if (!laundry) {
      return next({ message: info.message, statusCode: 403 });
    }

    // Make req.laundry that will be save the laundry value
    // And it will bring to controller
    req.laundry = laundry;

    // Next to authController.getToken
    next();
  })(req, res, next);
};

passport.use(
  "laundry",
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        // Find laundry
        let laundryLogin = await laundry.findOne({
          where: { id: token.laundry.id },
        });

        // If laundry has laundry role
        if (laundryLogin.role.includes("laundry")) {
          return done(null, token.laundry);
        }

        return done(null, false, {
          message: "You're not authorized",
        });
      } catch (e) {
        return done(null, false, {
          message: "You're not authorized",
        });
      }
    }
  )
);

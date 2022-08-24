const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const { user } = require("../../db/models");

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  done(null, user.id);
});

module.exports.signup = (req, res, next) => {
  // It will go to ../middlewares/auth/index.js -> passport.use("signup")
  passport.authenticate("register", (err, user, info) => {
    // If error
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err,
      });
    }

    // If user is false
    if (!user) {
      return res.status(401).json({
        message: info.message,
      });
    }

    // Make req.user that will be save the user value
    // And it will bring to controller
    req.user = user;

    // Next to authController.getToken
    next();
  })(req, res, next);
};

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        let userRegister = await user.create(req.body);

        return done(null, userRegister, {
          message: "User can be created",
        });
      } catch (e) {
        return done(null, false, {
          message: "Email has been used",
        });
      }
    }
  )
);

exports.signin = (req, res, next) => {
  // It will go to ../middlewares/auth/index.js -> passport.use("signin")
  passport.authenticate("signin", { session: false }, (err, user, info) => {
    // If error
    if (err) {
      return next(err);
    }

    // If user is false
    if (!user) {
      return next({ message: info.message, statusCode: 401 });
    }

    req.user = user;

    // Next to authController.getToken
    next();
  })(req, res, next);
};

// If user call this passport
passport.use(
  "signin",
  new LocalStrategy(
    {
      usernameField: "email", // usernameField is come from req.body.email
      passwordField: "password", // passwordField is come from req.body.password
      passReqToCallback: true, // enable to read req.body/req.params/req.query
    },
    async (req, email, password, done) => {
      try {
        let userSignIn = await user.findOne({ where: { email } });

        // If user doesn't exist
        if (!userSignIn) {
          return done(null, false, {
            message: "Email not found",
          });
        }

        // If user exist
        let validate = await bcrypt.compare(password, userSignIn.password);

        // If password is wrong
        if (!validate) {
          return done(null, false, {
            message: "Wrong password",
          });
        }

        return done(null, userSignIn, {
          message: "User can sign in",
        });
      } catch (e) {
        console.log(e);

        return done(null, false, {
          message: "User can't sign in",
        });
      }
    }
  )
);

exports.verify = (req, res, next) => {
  // It will go to ../middlewares/auth/index.js -> passport.use("signin")
  passport.authorize("verify", (err, user, info) => {
    // If error
    if (err) {
      return next(err);
    }

    // If user is false
    if (!user) {
      return next({ message: info.message, statusCode: 405 });
    }

    // Make req.user that will be save the user value
    // And it will bring to controller
    req.user = user;

    // Next to authController.getToken
    next();
    // return res.status(200).json({
    //   message: "success",
    // });
  })(req, res, next);
};

// If user call this passport
passport.use(
  "verify",
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET, // JWT Key
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("token"), // Get token from url
    },
    async (token, done) => {
      try {
        let userSignIn = await user.findOne({
          where: { email: token.user.email },
        });

        // If user doesn't exist
        if (!userSignIn) {
          return done(null, false, {
            message: "Email not found",
          });
        }

        // If user exist
        let update = await user.update(
          { status: "Active" },
          { where: { email: token.user.email } }
        );

        let verified = await user.findOne({
          where: { email: token.user.email },
        });

        return done(null, verified, {
          message: "User can sign in",
        });
      } catch (e) {
        console.log(e);

        return done(null, false, {
          message: "User can't sign in",
        });
      }
    }
  )
);

exports.admin = (req, res, next) => {
  // It will go to ../middlewares/auth/index.js -> passport.use("signup")
  passport.authorize("admin", (err, user, info) => {
    // If error
    if (err) {
      return next(err);
    }

    // If user is false
    if (!user) {
      return next({ message: info.message, statusCode: 403 });
    }

    // Make req.user that will be save the user value
    // And it will bring to controller
    req.user = user;

    // Next to authController.getToken
    next();
  })(req, res, next);
};

passport.use(
  "admin",
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET, // JWT Key
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // Get token from bearer
    },
    async (token, done) => {
      try {
        // Find user
        const userLogin = await user.findOne({ where: { id: token.user.id } });

        // If user is admin
        if (userLogin.role.includes("admin")) {
          return done(null, token.user);
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

exports.customer = (req, res, next) => {
  // It will go to ../middlewares/auth/index.js -> passport.use("signup")
  passport.authorize("customer", (err, user, info) => {
    // If error
    if (err) {
      //return next(err);
      return res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    }

    // If user is false
    if (!user) {
      //return next({ message: info.message, statusCode: 403 });
      return res.status(403).json({
        message: info.message,
      });
    }

    // Make req.user that will be save the user value
    // And it will bring to controller
    req.user = user;

    // Next to authController.getToken
    next();
  })(req, res, next);
};

passport.use(
  "customer",
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET, // JWT Key
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // Get token from bearer
    },
    async (token, done) => {
      try {
        // Find user
        const userLogin = await user.findOne({ where: { id: token.user.id } });

        // If user is admin
        if (userLogin.role.includes("customer")) {
          return done(null, token.user);
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

// exports.laundry = (req, res, next) => {
//   // It will go to ../middlewares/auth/index.js -> passport.use("signup")
//   passport.authorize("laundry", (err, user, info) => {
//     // If error
//     if (err) {
//       return next(err);
//     }

//     // If user is false
//     if (!user) {
//       return next({ message: info.message, statusCode: 403 });
//     }

//     // Make req.user that will be save the user value
//     // And it will bring to controller
//     req.user = user;

//     // Next to authController.getToken
//     next();
//   })(req, res, next);
// };

// passport.use(
//   "laundry",
//   new JWTstrategy(
//     {
//       secretOrKey: process.env.JWT_SECRET,
//       jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//     },
//     async (token, done) => {
//       try {
//         // Find user
//         let userSignIn = await user.findOne({ where: { id: token.user.id } });

//         // If user has user role
//         if (userSignIn.role.includes("laundry")) {
//           return done(null, token.user);
//         }

//         return done(null, false, {
//           message: "You're not authorized",
//         });
//       } catch (e) {
//         return done(null, false, {
//           message: "You're not authorized",
//         });
//       }
//     }
//   )
// );

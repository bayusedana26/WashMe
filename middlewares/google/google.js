require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const { user } = require("../../db/models");
const passport = require("passport");

passport.serializeUser(function (user, done) {
  //   done(null, user.id);
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  //   user
  //     .findOne({ where: { googleId: id.id } })
  //     .then((user) => {
  //     })
  //     .catch((err) => done(err, false));
  done(null, user);
});

const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      // Check if not registred in Washme
      try {
        let userGoogle = await user.findOrCreate({
          where: { email: profile.emails[0].value },
          defaults: {
            name: profile.displayName,
          },
        });

        let userSignIn = { ...userGoogle[0], method: "oauth" };

        return done(null, userSignIn);
      } catch (error) {
        return done(null, false, {
          message: "You're not authorized",
        });
      }
    }
  )
);

///////////////////////////////////////////// Cara Mas Reza //////////////////////////////////

// require("dotenv").config({
//   path: `.env.${process.env.NODE_ENV}`,
// });

// const { user } = require("../../db/models");
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth2").Strategy;

// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   console.log(id);
//   user
//     .findOne({ where: { googleId: id.id } })
//     .then((user) => {
//       done(null, user);
//     })
//     .catch((err) => done(err, false));
// });

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.CALLBACK_URL,
//       passReqToCallback: true,
//     },
//     function (request, accessToken, refreshToken, profile, done) {
//       // Check if not registred in Washme
//       user.findOrCreate({ googleId: profile.id }, function (err, user) {
//         return done(err, user);
//       });
//       // If registred in Washme
//       return done(null, profile);
//     }
//   )
// );

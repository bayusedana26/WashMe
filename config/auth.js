const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const { user, laundry } = require('../db/models');

// Passport serialization
passport.serializeUser((user, done) => {
  done(null, { id: user.id, type: user.type });
});

passport.deserializeUser(async ({ id, type }, done) => {
  try {
    const Model = type === 'laundry' ? laundry : user;
    const foundUser = await Model.findByPk(id);
    done(null, foundUser);
  } catch (err) {
    done(err);
  }
});

// Strategy configurations
const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
};

const localOptions = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
};

module.exports = {
  jwtOptions,
  localOptions,
  passport
}; 
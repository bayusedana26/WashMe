const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');
const fileUpload = require('express-fileupload');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const configureMiddleware = (app) => {
  // Basic middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));

  // Security middleware
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(xss());
  app.use(hpp());
  
  // Rate limiting
  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100
  });
  app.use(limiter);

  // Session handling
  app.use(cookieSession({
    name: 'wash-me-session',
    keys: [process.env.SESSION_KEY_1, process.env.SESSION_KEY_2],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }));

  // Passport configuration
  app.use(passport.initialize());
  app.use(passport.session());

  // File upload
  app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max-file-size
    useTempFiles: true,
    tempFileDir: '/tmp/'
  }));

  // Logging
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else {
    const accessLogStream = fs.createWriteStream(
      path.join(__dirname, '../logs/access.log'),
      { flags: 'a' }
    );
    app.use(morgan('combined', { stream: accessLogStream }));
  }
};

module.exports = configureMiddleware; 
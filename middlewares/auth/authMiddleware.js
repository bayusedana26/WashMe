const { asyncHandler } = require('../utils/middlewareUtils');
const { passport } = require('../../config/auth');
const ApiError = require('../../utils/ApiError');

const authenticate = (strategy) => {
  return asyncHandler(async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(strategy, { session: false }, (err, user, info) => {
        if (err) {
          return reject(new ApiError(500, 'Authentication error'));
        }
        if (!user) {
          return reject(new ApiError(401, info?.message || 'Authentication failed'));
        }
        req.user = user;
        resolve(next());
      })(req, res, next);
    });
  });
};

const authorize = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, 'Please authenticate');
    }
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, 'Not authorized to access this resource');
    }
    next();
  });
};

module.exports = {
  authenticate,
  authorize
}; 
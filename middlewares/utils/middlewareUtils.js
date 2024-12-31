const ApiError = require('../../utils/ApiError');

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new ApiError(400, error.details[0].message);
    }
    next();
  };
};

const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, 'Unauthorized');
    }
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, 'Forbidden');
    }
    next();
  };
};

module.exports = {
  asyncHandler,
  validateRequest,
  checkRole
}; 
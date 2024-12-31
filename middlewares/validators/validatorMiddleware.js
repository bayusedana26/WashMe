const { check, validationResult } = require('express-validator');
const ApiError = require('../../utils/ApiError');

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError(400, 'Validation error', errors.array());
    }
    next();
  };
};

// Common validation rules
const commonValidations = {
  email: check('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email'),
    
  password: check('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
    .withMessage('Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number and 1 special character'),

  phone: check('mobile_phone')
    .matches(/^(\+62|62|0)8[1-9][0-9]{6,9}$/)
    .withMessage('Please enter a valid Indonesian phone number')
};

module.exports = {
  validate,
  commonValidations
}; 
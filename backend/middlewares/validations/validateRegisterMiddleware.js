const { body } = require('express-validator');

const validations = [
    body('firstName')
        .notEmpty().withMessage('The name cannot be empty'),
    body('lastName')
        .notEmpty().withMessage('The lastname cannot be empty'),
    body('email')
        .notEmpty().withMessage('The mail cannot be empty').bail()
        .isEmail().withMessage('Enter a valid email'),
    body('password')
        .notEmpty().withMessage('The password cannot be empty').bail()
        .isLength({ min: 8 }).withMessage('At least 8 characters')
        .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/)
        .withMessage('Password must contain at least one uppercase letter, one number, and one special character'),
    body('checkPassword')
        .notEmpty().withMessage('The password cannot be empty').bail()
        .isLength({ min: 8 }).withMessage('At least 8 characters')
        .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/)
        .withMessage('Confirm Password must contain at least one uppercase letter, one number, and one special character'),
]

module.exports = {
    validateRegisterMiddleware: validations,
}
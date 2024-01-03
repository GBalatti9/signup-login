const { body } = require('express-validator');

const validations = [
    body('password')
        .notEmpty().withMessage('The password cannot be empty').bail()
        .isLength({ min: 8 }).withMessage('At least 8 characters')
        .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .withMessage('Password must contain at least one uppercase letter, one number, and one special character'),
    body('checkPassword')
        .notEmpty().withMessage('The password cannot be empty').bail()
        .isLength({ min: 8 }).withMessage('At least 8 characters')
        .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .withMessage('Confirm Password must contain at least one uppercase letter, one number, and one special character'),
]

module.exports = {
    validateUpdatePasswordMiddleware: validations,
}
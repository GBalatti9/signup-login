const { body } = require('express-validator');

const validations = [
    body('email')
        .notEmpty().withMessage('The mail cannot be empty').bail()
        .isEmail().withMessage('Enter a valid email'),
]

module.exports = {
    validateResetPasswordMiddleware: validations,
}
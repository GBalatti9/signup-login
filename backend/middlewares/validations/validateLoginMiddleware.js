const { body } = require('express-validator');

const validations = [
    body('email')
        .notEmpty().withMessage('The mail cannot be empty').bail()
        .isEmail().withMessage('Enter a valid email'),
    body('password')
        .notEmpty().withMessage('The password cannot be empty'),
]

module.exports = {
    validateLoginMiddleware: validations,
}
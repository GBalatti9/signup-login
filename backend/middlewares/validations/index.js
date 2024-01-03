const { validateRegisterMiddleware } = require('./validateRegisterMiddleware');
const { validateLoginMiddleware } = require('./validateLoginMiddleware');
const { validateResetPasswordMiddleware } = require('./validateResetPasswordMiddleware');

module.exports = {
    validateRegisterMiddleware,
    validateLoginMiddleware,
    validateResetPasswordMiddleware,
}
const { validateRegisterMiddleware } = require('./validateRegisterMiddleware');
const { validateLoginMiddleware } = require('./validateLoginMiddleware');
const { validateResetPasswordMiddleware } = require('./validateResetPasswordMiddleware');
const { validateUpdatePasswordMiddleware } = require('./validateUpdatePasswordMiddleware');


module.exports = {
    validateRegisterMiddleware,
    validateLoginMiddleware,
    validateResetPasswordMiddleware,
    validateUpdatePasswordMiddleware
}
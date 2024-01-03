const { isLoggedMiddleware } = require('./auth');
const { notLoggedMiddleware } = require('./auth');


const { validateRegisterMiddleware } = require('./validations');
const { validateLoginMiddleware } = require('./validations');
const { validateResetPasswordMiddleware } = require('./validations');


module.exports = {
    isLoggedMiddleware,
    notLoggedMiddleware,
    validateRegisterMiddleware,
    validateLoginMiddleware,
    validateResetPasswordMiddleware,
}
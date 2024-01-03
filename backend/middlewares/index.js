const { isLoggedMiddleware } = require('./auth');
const { notLoggedMiddleware } = require('./auth');


const { validateRegisterMiddleware } = require('./validations');


module.exports = {
    isLoggedMiddleware,
    notLoggedMiddleware,
    validateRegisterMiddleware,
}
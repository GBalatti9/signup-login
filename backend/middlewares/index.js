const { isLoggedMiddleware }  = require('./isLoggedMiddleware');
const { notLoggedMiddleware } = require('./notLoggedMiddleware');

module.exports = {
    isLoggedMiddleware,
    notLoggedMiddleware,
}
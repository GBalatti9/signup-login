
const { mainRoutes }          = require( './mainRoutes' );
const { loginRoutes }         = require( './loginRoutes' );
const { signupRoutes }        = require( './signupRoutes' );
const { verifyAccountRoutes } = require( './verifyAccountRoutes' );
const { gmailRoutes }         = require( './gmailRoutes' );
const { resetPasswordRoutes } = require( './resetPasswordRoutes' );
const { cookieRoutes }       = require('./getCookieRoutes');

module.exports = {
    mainRoutes,
    loginRoutes,
    signupRoutes,
    verifyAccountRoutes,
    gmailRoutes,
    resetPasswordRoutes,
    cookieRoutes,
}
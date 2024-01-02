
const { mainRoutes }          = require( './mainRoutes' );
const { loginRoutes }         = require( './loginRoutes' );
const { signupRoutes }        = require( './signupRoutes' );
const { verifyAccountRoutes } = require( './verifyAccountRoutes' );
const { gmailRoutes }         = require( './gmailRoutes' );
const { resetPasswordRoutes } = require( './resetPasswordRoutes' );

module.exports = {
    mainRoutes,
    loginRoutes,
    signupRoutes,
    verifyAccountRoutes,
    gmailRoutes,
    resetPasswordRoutes
}
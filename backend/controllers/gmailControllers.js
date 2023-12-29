const passport = require("passport");

module.exports = {

    authenticate: ( req, res, next ) => {
        passport.authenticate('google', { scope: [ 'email', 'profile' ] })( req, res, next );
    },

    redirect: ( req, res, next ) => {
        passport.authenticate('google', {
            successRedirect: '/',
            failureRedirect: '/auth/failure',
        })( req, res, next )
    },

    failureRedirect: ( req, res ) => {
        res.send( 'Something went wrong...' );
    },
}
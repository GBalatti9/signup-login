const passport = require("passport");

module.exports = {

    authenticate: () => {
        passport.authenticate('google', { scope: [ 'email', 'profile' ] })
    },

    redirect: () => {
        passport.authenticate('google', {
            successRedirect: '/',
            failureRedirect: '/auth/failure',
        })
    },

    failureRedirect: ( req, res ) => {
        res.send( 'Something went wrong...' );
    },
}
const passport = require("passport");

module.exports = {

    authenticate: ( req, res, next ) => {
        console.log("AUTHENTICATE");
        passport.authenticate('google', { scope: [ 'email', 'profile' ] })( req, res, next );
    },

    redirect: async ( req, res, next ) => {

        passport.authenticate('google', async( err, user ) => {

            try {
                if (err) {
                    return next(err);
                }

                if (!user) {
                    return res.redirect('/auth/failure');
                }
                
                delete user.id;
                delete user.password;
                req.session.user = user;
                return res.redirect('/');

            } catch (error) {
                return next(error);
            }
        })(req, res, next);
    },

    failureRedirect: ( req, res ) => {
        res.send( 'Something went wrong...' );
    },
}
const { User } = require('../database/models');
const passport = require("passport");

module.exports = {

    authenticate: async ( req, res, next ) => {
        const { type } = req.params;
        https://signup-login-qaz1.onrender.com/google/callback

        return res.json({ redirectUrl: `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=https%3A%2F%2Fsignup-login-qaz1.onrender.com%2Fgoogle%2Fcallback&scope=email%20profile&client_id=591521013838-5tld4ftfq0gd6cddc2cpod763dfp838j.apps.googleusercontent.com&service=lso&o2v=2&theme=glif&flowName=GeneralOAuthFlow&operation=${type}` })
        // return res.json({ redirectUrl: `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fgoogle%2Fcallback&scope=email%20profile&client_id=591521013838-5tld4ftfq0gd6cddc2cpod763dfp838j.apps.googleusercontent.com&service=lso&o2v=2&theme=glif&flowName=GeneralOAuthFlow&operation=${type}` })
        // passport.authenticate('google', { scope: ['email', 'profile'] } )( req, res, next );
    },
    
    redirect: async ( req, res, next ) => {
        // return console.log('Estoy en redirect');

        passport.authenticate('google', async( err, user ) => {

            try {
                if (err) {
                    return next(err);
                }

                if (!user) {
                    return res.redirect('/auth/failure');
                }
                
                console.log("USER BEFORE DATAVALUES: ", { user });
                user = user.dataValues
                console.log("USER AFTER DATAVALUES: ", { user });
                if (user.dataValues) {                    
                    delete user.id;
                    delete user.password;
                }
                req.session.user = user;

                res.cookie('email', user.email, {
                    maxAge: 1000 * 60 * 24 * 360 * 9999,
                    sameSite: 'None',
                    secure: true,
                })

                const url = 'https://argentina-world-cup.onrender.com/';
                // 'http://localhost:5173/login'
                return res.redirect(url);
                // return res.json({ user: user, success: 'Authentication with gmail successfully' })

            } catch (error) {
                return next(error);
            }
        })(req, res, next);
    },

    failureRedirect: ( req, res ) => {
        res.json({ errors: 'The user already has an account' });
        // res.send( 'Something went wrong...' );
    },
}
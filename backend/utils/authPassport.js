require('dotenv').config();
const passport = require('passport');
const { User } = require('../database/models');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
console.log('passport');
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://signup-login-qaz1.onrender.com/google/callback"
    // callbackURL: "http://localhost:3000/google/callback"
},
    async function ( accesToken, refreshToken, profile, done ) {
        console.log({ profile });
        // const { value } = profile.emails[0];
        const { email } = profile._json;
        try {
            
            const user = await User.findOne({ where: { email: email } });
            if ( user ) {
                console.log('The user exists on DB');
                return done ( null, user );
            }

            console.log('The user does not exists on DB');
            const { id, name } = profile;
            const { givenName, familyName } = name;

            const userData = {
                id: id,
                first_name: givenName,
                last_name: familyName,
                // email: value,
                email: email,
                password: '',
                verify: 1,
                token: 'Activated',
                expiration_time: 0,
                isGmailAccount: 1,
            }

            await User.create( userData );

            return done( null, profile );

        } catch (error) {
            console.log( error );
        }

    }
));

passport.serializeUser( ( user, done ) => {
    done( null, user )
});

passport.deserializeUser( ( user, done ) => {
    done( null, user )
});
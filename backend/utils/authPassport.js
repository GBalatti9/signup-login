require('dotenv').config();
const passport = require('passport');
const { User } = require('../database/models');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback"
},
    async function (accessToken, refreshToken, profile, done) {
        // console.log( profile.emails );
        const { value } = profile.emails[0];
        // console.log({ value });
        try {
            
            const user = await User.findOne({ where: { email: value } });
            // console.log({ user });
            if ( user ) {
                return done ( null, user );
            }

            const { id, name } = profile;
            const { givenName, familyName } = name;

            const userData = {
                id: id,
                first_name: givenName,
                last_name: familyName,
                email: value,
                password: null,
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
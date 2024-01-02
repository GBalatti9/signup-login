const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const passport = require('passport');
require('./utils/authPassport');

const { mainRoutes, loginRoutes, signupRoutes, verifyAccountRoutes, gmailRoutes, resetPasswordRoutes } = require('./routes');

const app = express();

app.use( express.urlencoded({ extended: true }) );
app.use( express.json() );
app.use( cookieParser() );
app.use( session({ secret: 'cats', resave: false, saveUninitialized: false }));
app.use( passport.initialize() );
app.use( passport.session() );
app.use( methodOverride('_method') );

app.use( async ( req, res, next ) => {
    if ( req.cookies.email ) {
        const { User } = require('./database/models');

        try {
            const user = await User.findOne({ where: { email: req.cookies.email } });

            delete user.id;
            delete user.password;

            req.session.user = user;

        } catch (error) {
            console.log( error );
        }
    }

    next();
})

app.use( mainRoutes );
app.use( loginRoutes );
app.use( signupRoutes );
app.use( verifyAccountRoutes );
app.use( gmailRoutes );
app.use( resetPasswordRoutes );

app.set('view engine', 'ejs');
app.set('views', [
    __dirname, './views',
    __dirname, './views/auth',
    __dirname, './views/resendToken',
    __dirname, './views/resetPassword',
])

const PORT = process.env.PORT || 3000;

app.listen( PORT, () => {
    console.log(`Server running on ${ PORT }`);
})
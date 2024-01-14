const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const passport = require('passport');
require('./utils/authPassport');

const { mainRoutes, loginRoutes, signupRoutes, verifyAccountRoutes, gmailRoutes, resetPasswordRoutes, cookieRoutes } = require('./routes');

const app = express();

app.use( express.urlencoded({ extended: true }) );
app.use( express.json() );
app.use( cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
}) );
app.use( cookieParser() );
app.use( session({ secret: 'cats', resave: false, saveUninitialized: false, cookie: { sameSite: 'none', secure: true } }));
app.use( passport.initialize() );
app.use( passport.session() );
app.use( methodOverride('_method') );

app.use( '/user', async ( req, res, next ) => {
    if ( req.cookies.email ) {
        const { User } = require('./database/models');

        try {
            let user = await User.findOne({ where: { email: req.cookies.email } });
            user = user.dataValues;
            
            delete user.id;
            delete user.password;

            req.session.user = user;

            return res.json({ success: user })

        } catch (error) {
            console.log( error );
        }
    } else {
        return res.json({ error: 'There is not user in cookie' });
    }

    next();
})

// app.use( cookieRoutes );
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
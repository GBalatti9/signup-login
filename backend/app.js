const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./utils/authPassport');

const { mainRoutes, loginRoutes, signupRoutes, verifyAccountRoutes, gmailRoutes, resetPasswordRoutes } = require('./routes');

const app = express();

app.use( express.urlencoded({ extended: true }) );
app.use( express.json() );
app.use( session({ secret: 'cats', resave: false, saveUninitialized: false }));
app.use( passport.initialize() );
app.use( passport.session() );

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
])

const PORT = process.env.PORT || 3000;

app.listen( PORT, () => {
    console.log(`Server running on ${ PORT }`);
})
const express = require('express');

const { mainRoutes, loginRoutes, signupRoutes, verifyAccountRoutes } = require('./routes');

const app = express();

app.use( express.urlencoded({ extended: true }) );
app.use( express.json() );

app.use( mainRoutes );
app.use( loginRoutes );
app.use( signupRoutes );
app.use( verifyAccountRoutes );

app.set('view engine', 'ejs');
app.set('views', [
    __dirname, './views',
    __dirname, './views/auth',
    __dirname, './views/status',
])

const PORT = process.env.PORT || 3000;

app.listen( PORT, () => {
    console.log(`Server running on ${ PORT }`);
})
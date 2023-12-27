const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', [
    __dirname + './views',
    __dirname + './views/auth'
])

const PORT = process.env.PORT || 3000;

app.listen( PORT, () => {
    console.log(`Server running on ${ PORT }`);
})
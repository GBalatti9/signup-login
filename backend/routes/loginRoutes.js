const express = require('express');

const router = express.Router();

router.get('/login', getLogin);

module.exports = {
    loginRoutes: router,
}
const express = require('express');
const { getLogin } = require('../controllers/loginControllers');

const router = express.Router();

router.get('/login', getLogin);

module.exports = {
    loginRoutes: router,
}
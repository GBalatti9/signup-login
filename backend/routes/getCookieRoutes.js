const express = require('express');
const { getCookie } = require('../controllers/cookieControllers');

const router = express.Router();

// @GET --> /user
router.get('/user', getCookie );

module.exports = {
    cookieRoutes: router,
}
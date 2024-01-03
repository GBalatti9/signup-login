const express = require('express');
const { getLogin, postLogin, postLogout } = require('../controllers/loginControllers');
const { isLoggedMiddleware } = require('../middlewares');

const router = express.Router();

// GET --> '/login'
router.get( '/login', isLoggedMiddleware, getLogin );

// @POST --> '/login'
router.post( '/login', postLogin );

// @POST --> '/logout'
router.post( '/logout', postLogout );

module.exports = {
    loginRoutes: router,
}
const express = require('express');
const { getLogin, postLogin, postLogout } = require('../controllers/loginControllers');
const { isLoggedMiddleware } = require('../middlewares');
const { validateLoginMiddleware } = require('../middlewares/validations');

const router = express.Router();

// GET --> '/login'
router.get( '/login', isLoggedMiddleware, getLogin );

// @POST --> '/login'
router.post( '/login', validateLoginMiddleware, postLogin );

// @POST --> '/logout'
router.post( '/logout', postLogout );

module.exports = {
    loginRoutes: router,
}
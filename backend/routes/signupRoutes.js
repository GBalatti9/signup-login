const express = require('express');
const { getRegister, postRegister } = require('../controllers/signupControllers');
const { isLoggedMiddleware, validateRegisterMiddleware } = require('../middlewares');

const router = express.Router();

// @GET --> '/register'
router.get( '/register', isLoggedMiddleware, getRegister );

// @POST --> '/register'
router.post( '/register', validateRegisterMiddleware, postRegister );

module.exports = {
    signupRoutes: router,
}
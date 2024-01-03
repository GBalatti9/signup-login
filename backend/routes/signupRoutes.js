const express = require('express');
const { getRegister, postRegister } = require('../controllers/signupControllers');
const { isLoggedMiddleware } = require('../middlewares');

const router = express.Router();

// @GET --> '/register'
router.get( '/register', isLoggedMiddleware, getRegister );

// @POST --> '/register'
router.post( '/register', postRegister );

module.exports = {
    signupRoutes: router,
}
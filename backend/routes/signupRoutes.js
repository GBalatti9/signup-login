const express = require('express');
const { getRegister, postRegister } = require('../controllers/signupControllers');

const router = express.Router();

// @GET --> '/register'
router.get( '/register', getRegister );

// @POST --> '/register'
router.get( '/register', postRegister );

module.exports = {
    signupRoutes: router,
}
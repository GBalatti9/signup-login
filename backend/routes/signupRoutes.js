const express = require('express');
const { getRegister, postRegister, verifyAccount } = require('../controllers/signupControllers');

const router = express.Router();

// @GET --> '/register'
router.get( '/register', getRegister );

// @POST --> '/register'
router.post( '/register', postRegister );

// @GET --> '/verify'
router.get( '/verify/:tokenId', verifyAccount )

module.exports = {
    signupRoutes: router,
}
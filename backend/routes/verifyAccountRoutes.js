
const express = require('express');
const { verifyAccount, resendToken } = require('../controllers/verifyAccountControllers');

const router = express.Router();

// @GET --> '/:route/verify/:id'
router.get( '/:route/verify/:id', verifyAccount );

// @POST --> '/verify'
router.post( '/verify', resendToken );

module.exports = {
    verifyAccountRoutes: router,
}
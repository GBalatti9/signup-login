
const express = require('express');
const { verifyAccount, postVerifyAccount } = require('../controllers/verifyAccountControllers');

const router = express.Router();

// @GET --> '/:route/verify/:id'
router.get( '/:route/verify/:id', verifyAccount );

// @POST --> '/verify'
router.post( '/verify', postVerifyAccount );

module.exports = {
    verifyAccountRoutes: router,
}
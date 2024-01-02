const express = require('express');
const { getForgotPassword, postForgotPassword, getResetPassword } = require('../controllers/resetPasswordControllers');

const router = express.Router();

// @GET --> '/forgot-password'
router.get( '/forgot-password', getForgotPassword );

// @POST --> '/forgot-password'
router.post( '/forgot-password', postForgotPassword );

// @GET --> '/forgot-password'
router.get( '/forgot-password/:id', getResetPassword );

module.exports = {
    resetPasswordRoutes: router,
}
const express = require('express');
const { getForgotPassword, postForgotPassword, getResetPassword, putResetPassword } = require('../controllers/resetPasswordControllers');

const router = express.Router();

// @GET --> '/forgot-password'
router.get( '/forgot-password', getForgotPassword );

// @POST --> '/forgot-password'
router.post( '/forgot-password', postForgotPassword );

// @GET --> '/forgot-password'
router.get( '/forgot-password/:id', getResetPassword );

// @PUT --> '/forgot-password'
router.put( '/forgot-password/:id', putResetPassword );

module.exports = {
    resetPasswordRoutes: router,
}
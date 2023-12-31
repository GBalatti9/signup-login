const express = require('express');
const { getForgotPassword, postForgotPassword, getResetPassword, putResetPassword } = require('../controllers/resetPasswordControllers');
const { isLoggedMiddleware, validateUpdatePasswordMiddleware, validateResetPasswordMiddleware } = require('../middlewares');

const router = express.Router();

// @GET --> '/forgot-password'
router.get( '/forgot-password', isLoggedMiddleware, getForgotPassword );

// @POST --> '/forgot-password'
router.post( '/forgot-password', validateResetPasswordMiddleware, postForgotPassword );

// @GET --> '/forgot-password'
router.get( '/forgot-password/:id', isLoggedMiddleware, getResetPassword );

// @PUT --> '/forgot-password'
router.put( '/forgot-password/:id', validateUpdatePasswordMiddleware, putResetPassword );

module.exports = {
    resetPasswordRoutes: router,
}
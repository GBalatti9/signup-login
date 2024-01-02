const express = require('express');
const { getForgotPassword, postForgotPassword } = require('../controllers/resetPasswordControllers');

const router = express.Router();

// @GET --> '/forgot-password'
router.get( '/forgot-password', getForgotPassword );

// @POST --> '/forgot-password'
router.post( '/forgot-password', postForgotPassword );

module.exports = {
    resetPasswordRoutes: router,
}
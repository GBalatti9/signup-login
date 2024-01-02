const express = require('express');
const { getForgotPassword } = require('../controllers/resetPasswordControllers');

const router = express.Router();

// @GET --> '/forgot-password'
router.get( '/forgot-password', getForgotPassword );

module.exports = {
    resetPasswordRoutes: router,
}
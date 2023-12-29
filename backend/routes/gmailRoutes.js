const express = require('express');
const { authenticate, redirect, failureRedirect } = require('../controllers/gmailControllers');

const router = express.Router();

// GET --> '/auth/google'
router.get( '/auth/google', authenticate );

// GET --> '/google/callback'
router.get( '/google/callback', redirect );

// GET --> '/auth/failure'
router.get( '/auth/failure', failureRedirect );

module.exports = {
    gmailRoutes: router,
}
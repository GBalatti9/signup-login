const express = require('express');

const router = express.Router();

// GET --> '/auth/google'
router.get( '/auth/google', );

// GET --> '/google/callback'
router.get( '/google/callback', );

// GET --> '/auth/failure'
router.get( '/auth/failure', )

module.exports = {
    gmailRoutes: router,
}
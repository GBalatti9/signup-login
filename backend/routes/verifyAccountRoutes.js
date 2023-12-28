
const express = require('express');
const { verifyAccount } = require('../controllers/verifyAccountControllers');

const router = express.Router();

// @GET --> '/:route/verify/:id'
router.get( '/:route/verify/:id', verifyAccount );

module.exports = {
    verifyAccountRoutes: router,
}
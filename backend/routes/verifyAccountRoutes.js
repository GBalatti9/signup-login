
const express = require('express');
const { verifyAccount } = require('../controllers/signupControllers');

const router = express.Router();

// @GET --> '/register/verify/:id'
router.get( '/:route/verify/:id', verifyAccount )

module.exports = {
    verifyAccountRoutes: router,
}
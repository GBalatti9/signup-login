const express = require('express');
const { getLogin, postLogin } = require('../controllers/loginControllers');

const router = express.Router();

// GET --> '/login'
router.get( '/login', getLogin );

// @POST --> '/login'
router.post( '/login', postLogin );

module.exports = {
    loginRoutes: router,
}
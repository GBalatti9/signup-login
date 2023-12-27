const express = require('express');
const { getRegister } = require('../controllers/signupControllers');

const router = express.Router();

router.get('/register', getRegister);

module.exports = {
    signupRoutes: router,
}
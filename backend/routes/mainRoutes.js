const express = require('express');
const { getIndex } = require('../controllers/mainControllers');
const { notLoggedMiddleware } = require('../middlewares/auth');

const router = express.Router();

router.get('/', notLoggedMiddleware, getIndex);

module.exports = {
    mainRoutes: router,
}
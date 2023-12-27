const express = require('express');
const { getIndex } = require('../controllers/mainControllers');

const router = express.Router();

router.get('/', getIndex);

module.exports = {
    mainRoutes: router,
}
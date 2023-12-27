const express = require('express');

const router = express.Router();

router.get('/', getIndex);

module.exports = {
    mainRoutes: router,
}
const express = require('express');
const cors = require('cors');

const { authenticate, redirect, failureRedirect } = require('../controllers/gmailControllers');

const router = express.Router();
router.use( cors({  
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
}) )

// GET --> '/auth/google'
router.get( '/auth/google/:type', authenticate );

// GET --> '/google/callback'
router.get( '/google/callback', redirect );

// GET --> '/auth/failure'
router.get( '/auth/failure', failureRedirect );


// const cors = require('cors');

// const googleAuthRoutes = express.Router();
// googleAuthRoutes.use(cors({
//     origin: ['http://localhost:5173', 'http://localhost:3000'],
//     credentials: true,
// }));

// Resto de las rutas de autenticación de Google aquí...

// app.use('/auth', googleAuthRoutes);

module.exports = {
    gmailRoutes: router,
}
const express = require('express');
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router(); // 👈 Acá creamos el router

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/perfil', authMiddleware, authController.me);

module.exports = router; // 👈 Esto es para poder usarlo en app.js

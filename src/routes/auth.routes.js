// Importa el módulo express para crear el enrutador
const express = require('express');
// Importa las funciones body y validationResult de express-validator para la validación de datos
const { body, validationResult } = require('express-validator');
// Importa el controlador de autenticación que contiene la lógica de negocio
const authController = require('../controllers/auth.controller');
// Importa el middleware de autenticación para proteger rutas
const authMiddleware = require('../middlewares/auth.middleware');

// Crea una nueva instancia del enrutador de Express
const router = express.Router();

// Middleware de validación genérico
// Esta función verifica si hay errores de validación después de aplicar las reglas de express-validator.
// Si hay errores, responde con un estado 400 y los detalles de los errores.
// Si no hay errores, pasa al siguiente middleware o controlador.
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Ruta para el inicio de sesión de usuarios
// Aplica reglas de validación para el email y la contraseña, luego el middleware 'validate',
// y finalmente el controlador 'authController.login'.
router.post('/login', [
  body('email').isEmail().withMessage('Debe ser un email válido'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria')
], validate, authController.login);

// Ruta para el registro de nuevos usuarios
// Aplica reglas de validación para el nombre, email y contraseña, luego el middleware 'validate',
// y finalmente el controlador 'authController.register'.
router.post('/register', [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('email').isEmail().withMessage('Debe ser un email válido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
], validate, authController.register);

// Ruta para obtener el perfil del usuario autenticado
// Protegida por el middleware de autenticación 'authMiddleware',
// luego pasa al controlador 'authController.me'.
router.get('/perfil', authMiddleware, authController.me);

// Exporta el enrutador para que pueda ser utilizado en 'app.js'
module.exports = router;

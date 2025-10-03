// Importa el módulo express para crear el enrutador
const router = require('express').Router();
// Importa las funciones body y validationResult de express-validator para la validación de datos
const { body, validationResult } = require('express-validator');
// Importa el controlador de reservas que contiene la lógica de negocio
const reservationsController = require('../controllers/reservations.controller');
// Importa el middleware de autenticación para proteger rutas
const auth = require('../middlewares/auth.middleware');

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

// Ruta para crear una nueva reserva
// Protegida por el middleware de autenticación 'auth'.
// Aplica reglas de validación para vehicleId, fecha 'desde' y fecha 'hasta',
// luego el middleware 'validate', y finalmente el controlador 'reservationsController.create'.
router.post('/', [
  auth,
  body('vehicleId').isNumeric().withMessage('vehicleId debe ser un número'),
  body('desde').isISO8601().toDate().withMessage('La fecha \'desde\' debe ser una fecha válida'),
  body('hasta').isISO8601().toDate().withMessage('La fecha \'hasta\' debe ser una fecha válida').custom((value, { req }) => {
    if (new Date(value) <= new Date(req.body.desde)) {
      throw new Error('La fecha \'hasta\' debe ser posterior a la fecha \'desde\'');
    }
    return true;
  })
], validate, reservationsController.create);

// Ruta para listar reservas
// Protegida por el middleware de autenticación 'auth'.
// El controlador 'reservationsController.list' maneja la lógica para listar todas las reservas (admin) o solo las del usuario (cliente).
router.get('/', auth, reservationsController.list);

// Ruta para listar reservas por ID de usuario
// Protegida por el middleware de autenticación 'auth'.
// El controlador 'reservationsController.listByUser' obtiene las reservas de un usuario específico.
router.get('/user/:userId', auth, reservationsController.listByUser);

// Ruta para cancelar una reserva por su ID
// Protegida por el middleware de autenticación 'auth'.
// El controlador 'reservationsController.cancel' maneja la lógica de cancelación.
router.delete('/:id', auth, reservationsController.cancel);

// Exporta el enrutador para que pueda ser utilizado en 'app.js'
module.exports = router;

// Importa el módulo express para crear el enrutador
const router = require('express').Router();
// Importa las funciones body y validationResult de express-validator para la validación de datos
const { body, validationResult } = require('express-validator');
// Importa el controlador de vehículos que contiene la lógica de negocio
const vehiclesController = require('../controllers/vehicles.controller');
// Importa el middleware de autenticación para proteger rutas
const auth = require('../middlewares/auth.middleware');
// Importa el middleware de autorización basado en roles
const requireRole = require('../middlewares/role.middleware');

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

// Reglas de validación para la creación de un vehículo
const vehicleValidationRules = [
  body('marca').notEmpty().withMessage('La marca es obligatoria'),
  body('modelo').notEmpty().withMessage('El modelo es obligatorio'),
  body('anio').isNumeric().withMessage('El año debe ser un número'),
  body('patente').notEmpty().withMessage('La patente es obligatoria'),
  body('precioPorDia').isNumeric().withMessage('El precio por día debe ser un número'),
  body('imagen').optional().isURL().withMessage('La imagen debe ser una URL válida')
];

// Reglas de validación para la actualización de un vehículo (campos opcionales)
const updateVehicleValidationRules = [
  body('marca').optional().notEmpty().withMessage('La marca es obligatoria'),
  body('modelo').optional().notEmpty().withMessage('El modelo es obligatorio'),
  body('anio').optional().isNumeric().withMessage('El año debe ser un número'),
  body('patente').optional().notEmpty().withMessage('La patente es obligatoria'),
  body('precioPorDia').optional().isNumeric().withMessage('El precio por día debe ser un número'),
  body('imagen').optional().isURL().withMessage('La imagen debe ser una URL válida')
];

// Ruta para listar todos los vehículos
router.get('/', vehiclesController.list);
// Ruta para listar vehículos disponibles en un rango de fechas
router.get('/disponibles', vehiclesController.available);
// Ruta para obtener un vehículo específico por su ID
router.get('/:id', vehiclesController.getById);

// Rutas protegidas para administradores
// Ruta para crear un nuevo vehículo
// Protegida por autenticación, rol de administrador y validación de datos.
router.post('/', auth, requireRole('admin'), vehicleValidationRules, validate, vehiclesController.create);
// Ruta para actualizar un vehículo existente
// Protegida por autenticación, rol de administrador y validación de datos.
router.put('/:id', auth, requireRole('admin'), updateVehicleValidationRules, validate, vehiclesController.update);
// Ruta para eliminar un vehículo
// Protegida por autenticación y rol de administrador.
router.delete('/:id', auth, requireRole('admin'), vehiclesController.delete);

// Exporta el enrutador para que pueda ser utilizado en 'app.js'
module.exports = router;

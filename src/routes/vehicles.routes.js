const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const vehiclesController = require('../controllers/vehicles.controller');
const auth = require('../middlewares/auth.middleware');
const requireRole = require('../middlewares/role.middleware');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const vehicleValidationRules = [
  body('marca').notEmpty().withMessage('La marca es obligatoria'),
  body('modelo').notEmpty().withMessage('El modelo es obligatorio'),
  body('anio').isNumeric().withMessage('El año debe ser un número'),
  body('patente').notEmpty().withMessage('La patente es obligatoria'),
  body('precioPorDia').isNumeric().withMessage('El precio por día debe ser un número'),
  body('imagen').optional().isURL().withMessage('La imagen debe ser una URL válida')
];

const updateVehicleValidationRules = [
  body('marca').optional().notEmpty().withMessage('La marca es obligatoria'),
  body('modelo').optional().notEmpty().withMessage('El modelo es obligatorio'),
  body('anio').optional().isNumeric().withMessage('El año debe ser un número'),
  body('patente').optional().notEmpty().withMessage('La patente es obligatoria'),
  body('precioPorDia').optional().isNumeric().withMessage('El precio por día debe ser un número'),
  body('imagen').optional().isURL().withMessage('La imagen debe ser una URL válida')
];

router.get('/', vehiclesController.list);
router.get('/disponibles', vehiclesController.available);
router.get('/:id', vehiclesController.getById);

// Admin only
router.post('/', auth, requireRole('admin'), vehicleValidationRules, validate, vehiclesController.create);
router.put('/:id', auth, requireRole('admin'), updateVehicleValidationRules, validate, vehiclesController.update);
router.delete('/:id', auth, requireRole('admin'), vehiclesController.delete); // Nueva ruta DELETE

module.exports = router;

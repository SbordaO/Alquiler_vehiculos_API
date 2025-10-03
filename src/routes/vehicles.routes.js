const router = require('express').Router();
const vehiclesController = require('../controllers/vehicles.controller');
const auth = require('../middlewares/auth.middleware');
const requireRole = require('../middlewares/role.middleware');

router.get('/', vehiclesController.list);
router.get('/disponibles', vehiclesController.available);
router.get('/:id', vehiclesController.getById);

// Admin only
router.post('/', auth, requireRole('admin'), vehiclesController.create);
router.put('/:id', auth, requireRole('admin'), vehiclesController.update);
router.delete('/:id', auth, requireRole('admin'), vehiclesController.delete); // Nueva ruta DELETE

module.exports = router;

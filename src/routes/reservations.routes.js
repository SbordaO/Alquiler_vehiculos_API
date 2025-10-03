const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const reservationsController = require('../controllers/reservations.controller');
const auth = require('../middlewares/auth.middleware');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

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

router.get('/', auth, reservationsController.list);
router.get('/user/:userId', auth, reservationsController.listByUser);
router.delete('/:id', auth, reservationsController.cancel);

module.exports = router;

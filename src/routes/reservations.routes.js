const router = require('express').Router();
const reservationsController = require('../controllers/reservations.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/', auth, reservationsController.create);
router.get('/', auth, reservationsController.list);
router.delete('/:id', auth, reservationsController.cancel);

module.exports = router;

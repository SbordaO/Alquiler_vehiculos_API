const router = require('express').Router();
const reservationsController = require('../controllers/reservations.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/', auth, reservationsController.create);
router.get('/', auth, reservationsController.list);
router.get('/user/:userId', auth, reservationsController.listByUser);
router.delete('/:id', auth, reservationsController.cancel);

module.exports = router;

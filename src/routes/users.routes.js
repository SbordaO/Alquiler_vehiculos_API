const router = require('express').Router();
const usersController = require('../controllers/users.controller');
const auth = require('../middlewares/auth.middleware');
const requireRole = require('../middlewares/role.middleware');

router.get('/', auth, requireRole('admin'), usersController.list);

module.exports = router;

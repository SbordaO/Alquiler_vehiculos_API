// Importa el módulo express para crear el enrutador
const router = require('express').Router();
// Importa el controlador de usuarios que contiene la lógica de negocio
const usersController = require('../controllers/users.controller');
// Importa el middleware de autenticación para proteger rutas
const auth = require('../middlewares/auth.middleware');
// Importa el middleware de autorización basado en roles
const requireRole = require('../middlewares/role.middleware');

// Ruta para listar todos los usuarios
// Esta ruta está protegida por el middleware de autenticación 'auth'
// y solo es accesible para usuarios con el rol 'admin' gracias al middleware 'requireRole('admin')'.
// Finalmente, el controlador 'usersController.list' se encarga de obtener y enviar la lista de usuarios.
router.get('/', auth, requireRole('admin'), usersController.list);

// Exporta el enrutador para que pueda ser utilizado en 'app.js'
module.exports = router;

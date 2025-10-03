// Importación de módulos necesarios
const express = require('express'); // Framework para construir aplicaciones web y APIs
require('dotenv').config(); // Carga variables de entorno desde un archivo .env
const cors = require('cors'); // Middleware para habilitar CORS (Cross-Origin Resource Sharing)
const pool = require('./src/config/db'); // Importa la configuración de la conexión a la base de datos MySQL

// Importación de los enrutadores
const authRoutes = require('./src/routes/auth.routes'); // Rutas para autenticación (login, registro)
const usersRoutes = require('./src/routes/users.routes'); // Rutas para la gestión de usuarios
const vehiclesRoutes = require('./src/routes/vehicles.routes'); // Rutas para la gestión de vehículos
const reservationsRoutes = require('./src/routes/reservations.routes'); // Rutas para la gestión de reservas

// Creación de la aplicación Express
const app = express();

// Middlewares globales
app.use(cors()); // Habilita CORS para permitir peticiones desde otros dominios (ej. el frontend)
app.use(express.json()); // Parsea el cuerpo de las peticiones entrantes a formato JSON

// Definición de las rutas de la API
app.use('/auth', authRoutes); // Las peticiones a /auth se dirigirán a authRoutes
app.use('/vehiculos', vehiclesRoutes); // Las peticiones a /vehiculos se dirigirán a vehiclesRoutes
app.use('/usuarios', usersRoutes); // Las peticiones a /usuarios se dirigirán a usersRoutes
app.use('/api/upload', require('./src/routes/upload.routes')); // Ruta para la subida de archivos
app.use('/reservas', reservationsRoutes); // Las peticiones a /reservas se dirigirán a reservationsRoutes

// Middleware para manejo de errores
// Se ejecuta si ocurre un error en alguna de las rutas anteriores
app.use((err, req, res, next) => {
  console.error(err); // Muestra el error en la consola del servidor
  res.status(500).json({ ok: false, msg: 'Error del servidor' }); // Devuelve una respuesta de error genérica
});

// Definición del puerto del servidor
const PORT = process.env.PORT || 3000; // Usa el puerto definido en las variables de entorno, o 3000 por defecto

// Función autoejecutable para iniciar el servidor y probar la conexión a la base de datos
(async () => {
  try {
    // Intenta hacer una consulta simple para verificar la conexión a la DB
    await pool.query('SELECT 1');
    console.log('✅ Conectado a la base de datos MySQL');

    // Inicia el servidor Express para que escuche peticiones en el puerto definido
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
  } catch (err) {
    // Si la conexión a la base de datos falla, muestra un error y termina el proceso
    console.error('❌ No se pudo conectar a la DB:', err);
    process.exit(1);
  }
})();

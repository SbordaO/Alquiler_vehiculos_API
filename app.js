const express = require('express');
require('dotenv').config();
const cors = require('cors');
const pool = require('./src/config/db'); // conexión mysql2

// Importar rutas
const authRoutes = require('./src/routes/auth.routes');
const usersRoutes = require('./src/routes/users.routes');
const vehiclesRoutes = require('./src/routes/vehicles.routes');
const reservationsRoutes = require('./src/routes/reservations.routes');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/vehiculos', require('./src/routes/vehicles.routes'));
app.use('/usuarios', require('./src/routes/users.routes'));
app.use('/api/upload', require('./src/routes/upload.routes')); // Nueva ruta para subidas
app.use('/reservas', reservationsRoutes);

// Error handler simple
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ ok: false, msg: 'Error del servidor' });
});

const PORT = process.env.PORT || 3000;

// Iniciar servidor y probar conexión
(async () => {
  try {
    await pool.query('SELECT 1'); // prueba conexión
    console.log('✅ Conectado a la base de datos MySQL');
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ No se pudo conectar a la DB:', err);
    process.exit(1);
  }
})();

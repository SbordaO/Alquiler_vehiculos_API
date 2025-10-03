// Importa el pool de conexiones a la base de datos y la librería bcrypt para encriptación
const pool = require('../config/db');
const bcrypt = require('bcrypt');

// Controlador para listar todos los usuarios
exports.list = async (req, res) => {
  try {
    // Consulta la base de datos para obtener el id, nombre, email y rol de todos los usuarios
    const [users] = await pool.query('SELECT id, nombre, email, rol FROM users');
    // Responde con la lista de usuarios
    res.json({ ok: true, users });
  } catch (err) {
    // Manejo de errores del servidor
    res.status(500).json({ ok: false, msg: 'Error interno' });
  }
};

// Controlador para crear un nuevo usuario
exports.create = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body; // Extrae los datos del usuario del cuerpo de la petición

    // Validación de campos obligatorios
    if (!nombre || !email || !password || !rol) {
      return res.status(400).json({ ok: false, msg: 'Todos los campos son obligatorios' });
    }

    // Encripta la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 3);

    // Inserta el nuevo usuario en la base de datos
    await pool.query(
      'INSERT INTO users (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
      [nombre, email, hashedPassword, rol]
    );

    // Responde con un mensaje de éxito
    res.status(201).json({ ok: true, msg: 'Usuario creado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, msg: 'Error interno' }); // Manejo de errores del servidor
  }
};
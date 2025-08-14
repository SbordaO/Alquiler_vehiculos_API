const pool = require('../config/db');
const bcrypt = require('bcrypt');

//Listar usuarios
exports.list = async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, nombre, email, rol FROM users');
    res.json({ ok: true, users });
  } catch (err) {
    res.status(500).json({ ok: false, msg: 'Error interno' });
  }
};
// Crear usuario
exports.create = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password || !rol) {
      return res.status(400).json({ ok: false, msg: 'Todos los campos son obligatorios' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 3);

    // Insertar en la base de datos
    await pool.query(
      'INSERT INTO users (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
      [nombre, email, hashedPassword, rol]
    );

    res.status(201).json({ ok: true, msg: 'Usuario creado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, msg: 'Error interno' });
  }
};
// Importa el pool de conexiones a la base de datos y librerías necesarias
const pool = require('../config/db');
const bcrypt = require('bcrypt'); // Para encriptar contraseñas
const jwt = require('jsonwebtoken'); // Para generar JSON Web Tokens
require('dotenv').config(); // Carga variables de entorno

// Secreto para firmar los JWT, tomado de las variables de entorno o un valor por defecto
const JWT_SECRET = process.env.JWT_SECRET || 'tu_jwt_secreto';

// Controlador para el registro de nuevos usuarios
exports.register = async (req, res) => {
  console.log('Register function hit. Request body:', req.body);
  try {
    const { nombre, email, password } = req.body;

    // Validación básica de campos requeridos
    if (!email || !password) return res.status(400).json({ ok: false, msg: 'Email y password requeridos' });

    // Verifica si el email ya está registrado
    const [exists] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (exists.length) return res.status(400).json({ ok: false, msg: 'Email ya registrado' });

    // Encripta la contraseña antes de guardarla en la base de datos
    const hashed = await bcrypt.hash(password, 10);

    // Inserta el nuevo usuario en la base de datos
    const [result] = await pool.query(
      'INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)',
      [nombre, email, hashed]
    );

    // Responde con el usuario creado y un estado de éxito
    res.status(201).json({ ok: true, user: { id: result.insertId, nombre, email, rol: 'cliente' } });
  } catch (err) {
    // Manejo de errores del servidor
    console.error(err);
    res.status(500).json({ ok: false, msg: 'Error interno' });
  }
};

// Controlador para el inicio de sesión de usuarios
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Busca el usuario por email en la base de datos
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    // Si el usuario no existe, devuelve un error de credenciales inválidas
    if (!user) return res.status(400).json({ ok: false, msg: 'Credenciales inválidas' });

    // Compara la contraseña proporcionada con la contraseña encriptada almacenada
    const ok = await bcrypt.compare(password, user.password);

    // Si las contraseñas no coinciden, devuelve un error de credenciales inválidas
    if (!ok) return res.status(400).json({ ok: false, msg: 'Credenciales inválidas' });

    // Genera un JSON Web Token (JWT) para el usuario autenticado
    const token = jwt.sign({ id: user.id, email: user.email, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Responde con un mensaje de éxito, el token y el rol del usuario
    res.json({ ok: true, msg: 'Login exitoso', token, rol: user.rol });
  } catch (err) {
    // Manejo de errores del servidor
    res.status(500).json({ ok: false, msg: 'Error interno' });
  }
};

// Controlador para obtener el perfil del usuario autenticado
exports.me = async (req, res) => {
  try {
    // Busca el usuario en la base de datos usando el ID del usuario extraído del token JWT
    const [rows] = await pool.query('SELECT id, nombre, email, rol FROM users WHERE id = ?', [req.user.id]);

    // Responde con la información del usuario
    res.json({ ok: true, user: rows[0] });
  } catch (err) {
    // Manejo de errores del servidor
    res.status(500).json({ ok: false, msg: 'Error interno' });
  }
};

const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'tu_jwt_secreto';

exports.register = async (req, res) => {
  console.log('Register function hit. Request body:', req.body);
  try {
    const { nombre, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ ok: false, msg: 'Email y password requeridos' });

    const [exists] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (exists.length) return res.status(400).json({ ok: false, msg: 'Email ya registrado' });

    const hashed = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)',
      [nombre, email, hashed]
    );

    res.status(201).json({ ok: true, user: { id: result.insertId, nombre, email, rol: 'cliente' } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, msg: 'Error interno' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];
    if (!user) return res.status(400).json({ ok: false, msg: 'Credenciales inválidas' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ ok: false, msg: 'Credenciales inválidas' });

    // Generar JWT
    const token = jwt.sign({ id: user.id, email: user.email, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ ok: true, msg: 'Login exitoso', token, rol: user.rol });
  } catch (err) {
    res.status(500).json({ ok: false, msg: 'Error interno' });
  }
};

exports.me = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, nombre, email, rol FROM users WHERE id = ?', [req.user.id]);
    res.json({ ok: true, user: rows[0] });
  } catch (err) {
    res.status(500).json({ ok: false, msg: 'Error interno' });
  }
};

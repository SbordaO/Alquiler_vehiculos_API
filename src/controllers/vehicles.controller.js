const pool = require('../config/db');

exports.list = async (req, res) => {
  try {
    const [vehicles] = await pool.query('SELECT * FROM vehicles');
    res.json({ ok: true, vehicles });
  } catch (err) {
    res.status(500).json({ ok: false, msg: 'Error interno' });
  }
};

exports.get = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM vehicles WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ ok: false, msg: 'No encontrado' });
    res.json({ ok: true, vehicle: rows[0] });
  } catch (err) {
    res.status(500).json({ ok: false, msg: 'Error interno' });
  }
};

exports.create = async (req, res) => {
  try {
    const { marca, modelo, anio, patente, precioPorDia } = req.body;
    const [result] = await pool.query(
      'INSERT INTO vehicles (marca, modelo, anio, patente, precioPorDia) VALUES (?, ?, ?, ?, ?)',
      [marca, modelo, anio, patente, precioPorDia]
    );
    res.status(201).json({ ok: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ ok: false, msg: 'Error interno' });
  }
};

exports.update = async (req, res) => {
  try {
    const [result] = await pool.query('UPDATE vehicles SET ? WHERE id = ?', [req.body, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ ok: false, msg: 'No encontrado' });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, msg: 'Error interno' });
  }
};

exports.available = async (req, res) => {
  try {
    const { desde, hasta } = req.query;
    if (!desde || !hasta) return res.status(400).json({ ok: false, msg: 'Parámetros desde y hasta requeridos' });

    const [reserved] = await pool.query(
      `SELECT DISTINCT vehicleId FROM reservations
       WHERE estado = 'activa'
       AND NOT (hasta < ? OR desde > ?)`,
      [desde, hasta]
    );

    const reservedIds = reserved.map(r => r.vehicleId);
    const query = reservedIds.length
      ? 'SELECT * FROM vehicles WHERE id NOT IN (?)'
      : 'SELECT * FROM vehicles';

    const [available] = reservedIds.length
      ? await pool.query(query, [reservedIds])
      : await pool.query(query);

    res.json({ ok: true, vehicles: available });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, msg: 'Error interno' });
  }
};

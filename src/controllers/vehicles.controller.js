const pool = require('../config/db');

exports.list = async (req, res) => {
  try {
    const { desde, hasta } = req.query;

    let query = 'SELECT * FROM vehicles';
    const params = [];

    if (desde && hasta) {
      query = `
        SELECT v.* FROM vehicles v
        WHERE NOT EXISTS (
          SELECT 1 FROM reservations r
          WHERE r.vehicleId = v.id
          AND r.estado = 'activa'
          AND NOT (r.hasta < ? OR r.desde > ?)
        )
      `;
      params.push(desde, hasta);
    }

    const [vehicles] = await pool.query(query, params);
    res.json({ ok: true, vehicles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, msg: 'Error interno' });
  }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM vehicles WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ ok: false, msg: 'No encontrado' });

    const vehicle = rows[0];

    const [reservations] = await pool.query(
      'SELECT desde, hasta FROM reservations WHERE vehicleId = ? AND estado = \'activa\'',
      [req.params.id]
    );

    res.json({ ok: true, vehicle, reservations });
  } catch (err) {
    res.status(500).json({ ok: false, msg: 'Error interno' });
  }
};

exports.create = async (req, res) => {
  try {
    const { marca, modelo, anio, patente, precioPorDia, imagen } = req.body;
    const [result] = await pool.query(
      'INSERT INTO vehicles (marca, modelo, anio, patente, precioPorDia, imagen) VALUES (?, ?, ?, ?, ?, ?)',
      [marca, modelo, anio, patente, precioPorDia, imagen]
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

exports.delete = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM vehicles WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ ok: false, msg: 'No encontrado' });
    res.json({ ok: true, msg: 'Vehículo eliminado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, msg: 'Error interno' });
  }
};

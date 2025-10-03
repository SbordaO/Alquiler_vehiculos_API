const pool = require('../config/db');

exports.create = async (req, res) => {
  try {
    const { vehicleId, desde, hasta } = req.body;
    const userId = req.user.id;

    console.log(`Attempting to create reservation for vehicleId: ${vehicleId}, desde: ${desde}, hasta: ${hasta}`);

    const [veh] = await pool.query('SELECT * FROM vehicles WHERE id = ?', [vehicleId]);
    if (!veh.length) return res.status(404).json({ ok: false, msg: 'Vehículo no encontrado' });

    const [conflict] = await pool.query(
      `SELECT id FROM reservations
       WHERE vehicleId = ? AND estado = 'activa'
       AND NOT (hasta < ? OR desde > ?)`,
      [vehicleId, desde, hasta]
    );
    if (conflict.length) return res.status(400).json({ ok: false, msg: 'No disponible' });

    const d1 = new Date(desde);
    const d2 = new Date(hasta);
    const days = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24)) + 1;
    const total = (veh[0].precioPorDia * days).toFixed(2);

    const [result] = await pool.query(
      `INSERT INTO reservations (userId, vehicleId, desde, hasta, total)
       VALUES (?, ?, ?, ?, ?)`,
      [userId, vehicleId, desde, hasta, total]
    );
    res.status(201).json({ ok: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ ok: false, msg: 'Error interno' });
  }
};

exports.list = async (req, res) => {
  try {
    let query = `
      SELECT 
        r.id,
        r.desde,
        r.hasta,
        r.total,
        r.estado,
        v.marca AS vehicle_marca,
        v.modelo AS vehicle_modelo,
        u.email AS user_email
      FROM reservations r
      JOIN vehicles v ON r.vehicleId = v.id
      JOIN users u ON r.userId = u.id
    `;
    let params = [];

    if (req.user.rol !== 'admin') {
      query += ' WHERE r.userId = ?';
      params.push(req.user.id);
    }

    const [rows] = await pool.query(query, params);
    res.json({ ok: true, reservations: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, msg: 'Error interno' });
  }
};

exports.cancel = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM reservations WHERE id = ?', [req.params.id]);
    const reservation = rows[0];
    if (!reservation) return res.status(404).json({ ok: false, msg: 'No encontrado' });

    if (req.user.rol !== 'admin' && reservation.userId !== req.user.id) {
      return res.status(403).json({ ok: false, msg: 'No autorizado' });
    }

    await pool.query('UPDATE reservations SET estado = "cancelada" WHERE id = ?', [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, msg: 'Error interno' });
  }
};

exports.listByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const [reservations] = await pool.query(
      `SELECT r.id, r.desde, r.hasta, r.total, r.estado,
              v.marca AS vehicle_marca, v.modelo AS vehicle_modelo, v.anio AS vehicle_anio,
              u.nombre AS user_nombre, u.email AS user_email
       FROM reservations r
       JOIN vehicles v ON r.vehicleId = v.id
       JOIN users u ON r.userId = u.id
       WHERE r.userId = ?`,
      [userId]
    );
    res.json({ ok: true, reservations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, msg: 'Error interno al obtener reservas por usuario' });
  }
};
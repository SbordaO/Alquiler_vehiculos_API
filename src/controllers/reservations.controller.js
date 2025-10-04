// Importa el pool de conexiones a la base de datos
const pool = require('../config/db');

// Controlador para crear una nueva reserva
exports.create = async (req, res) => {
  try {
    const { vehicleId, desde, hasta } = req.body; // Extrae los datos de la reserva del cuerpo de la petición
    const userId = req.user.id; // Obtiene el ID del usuario autenticado

    console.log(`Attempting to create reservation for vehicleId: ${vehicleId}, desde: ${desde}, hasta: ${hasta}`);

    // Verifica si el vehículo existe
    const [veh] = await pool.query('SELECT * FROM vehicles WHERE id = ?', [vehicleId]);
    if (!veh.length) return res.status(404).json({ ok: false, msg: 'Vehículo no encontrado' });

    // Verifica si hay conflictos de fechas con otras reservas activas para el mismo vehículo
    const [conflict] = await pool.query(
      `SELECT id FROM reservations
       WHERE vehicleId = ? AND estado = 'activa'
       AND NOT (hasta < ? OR desde > ?)`,
      [vehicleId, desde, hasta]
    );
    if (conflict.length) return res.status(400).json({ ok: false, msg: 'No disponible' });

    // Calcula el número de días de la reserva y el costo total
    const d1 = new Date(desde);
    const d2 = new Date(hasta);
    const days = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24)) + 1;
    const total = (veh[0].precioPorDia * days).toFixed(2);

    // Inserta la nueva reserva en la base de datos
    const [result] = await pool.query(
      `INSERT INTO reservations (userId, vehicleId, desde, hasta, total)
       VALUES (?, ?, ?, ?, ?)`, 
      [userId, vehicleId, desde, hasta, total]
    );
    res.status(201).json({ ok: true, id: result.insertId }); // Responde con el ID de la reserva creada
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, msg: 'Error interno' }); // Manejo de errores del servidor
  }
};

// Controlador para listar todas las reservas o las del usuario autenticado
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

    // Si el usuario no es administrador, solo puede ver sus propias reservas
    if (req.user.rol !== 'admin') {
      query += ' WHERE r.userId = ?';
      params.push(req.user.id);
    }

    const [rows] = await pool.query(query, params); // Ejecuta la consulta
    res.json({ ok: true, reservations: rows }); // Responde con la lista de reservas
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, msg: 'Error interno' }); // Manejo de errores del servidor
  }
};

// Controlador para cancelar una reserva
exports.cancel = async (req, res) => {
  try {
    // Busca la reserva por su ID
    const [rows] = await pool.query('SELECT * FROM reservations WHERE id = ?', [req.params.id]);
    const reservation = rows[0];
    if (!reservation) return res.status(404).json({ ok: false, msg: 'No encontrado' });

    // Verifica si el usuario tiene permiso para cancelar la reserva (admin o dueño de la reserva)
    if (req.user.rol !== 'admin' && reservation.userId !== req.user.id) {
      return res.status(403).json({ ok: false, msg: 'No autorizado' });
    }

    // Actualiza el estado de la reserva a 'cancelada'
    await pool.query('UPDATE reservations SET estado = "cancelada" WHERE id = ?', [req.params.id]);
    res.json({ ok: true }); // Responde con un mensaje de éxito
  } catch (err) {
    res.status(500).json({ ok: false, msg: 'Error interno' }); // Manejo de errores del servidor
  }
};

// Controlador para listar reservas por ID de usuario
exports.listByUser = async (req, res) => {
  try {
    const { userId } = req.params; // Obtiene el ID del usuario de los parámetros de la ruta

    // Consulta las reservas de un usuario específico, incluyendo detalles del vehículo y del usuario
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
    res.json({ ok: true, reservations }); // Responde con la lista de reservas del usuario
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, msg: 'Error interno al obtener reservas por usuario' }); // Manejo de errores del servidor
  }
};
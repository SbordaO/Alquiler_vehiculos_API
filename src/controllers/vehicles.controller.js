// Importa el pool de conexiones a la base de datos
const pool = require('../config/db');

// Controlador para listar vehículos
exports.list = async (req, res) => {
  try {
    const { desde, hasta } = req.query; // Obtiene los parámetros de fecha de la consulta

    let query = 'SELECT * FROM vehicles';
    const params = [];

    // Si se proporcionan fechas, filtra los vehículos disponibles en ese rango
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

    const [vehicles] = await pool.query(query, params); // Ejecuta la consulta
    res.json({ ok: true, vehicles }); // Responde con la lista de vehículos
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, msg: 'Error interno' }); // Manejo de errores del servidor
  }
};

// Controlador para obtener un vehículo por su ID
exports.getById = async (req, res) => {
  try {
    // Busca el vehículo por su ID
    const [rows] = await pool.query('SELECT * FROM vehicles WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ ok: false, msg: 'No encontrado' });

    const vehicle = rows[0];

    // Obtiene las reservas activas para ese vehículo
    const [reservations] = await pool.query(
      'SELECT desde, hasta FROM reservations WHERE vehicleId = ? AND estado = \'activa\'',
      [req.params.id]
    );

    res.json({ ok: true, vehicle, reservations }); // Responde con los detalles del vehículo y sus reservas
  } catch (err) {
    res.status(500).json({ ok: false, msg: 'Error interno' }); // Manejo de errores del servidor
  }
};

// Controlador para crear un nuevo vehículo (solo para administradores)
exports.create = async (req, res) => {
  try {
    const { marca, modelo, anio, patente, precioPorDia, imagen } = req.body; // Extrae los datos del vehículo
    // Inserta el nuevo vehículo en la base de datos
    const [result] = await pool.query(
      'INSERT INTO vehicles (marca, modelo, anio, patente, precioPorDia, imagen) VALUES (?, ?, ?, ?, ?, ?)',
      [marca, modelo, anio, patente, precioPorDia, imagen]
    );
    res.status(201).json({ ok: true, id: result.insertId }); // Responde con el ID del vehículo creado
  } catch (err) {
    res.status(500).json({ ok: false, msg: 'Error interno' }); // Manejo de errores del servidor
  }
};

// Controlador para actualizar un vehículo existente (solo para administradores)
exports.update = async (req, res) => {
  try {
    // Actualiza los datos del vehículo en la base de datos
    const [result] = await pool.query('UPDATE vehicles SET ? WHERE id = ?', [req.body, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ ok: false, msg: 'No encontrado' });
    res.json({ ok: true }); // Responde con un mensaje de éxito
  } catch (err) {
    res.status(500).json({ ok: false, msg: 'Error interno' }); // Manejo de errores del servidor
  }
};

// Controlador para listar vehículos disponibles en un rango de fechas
exports.available = async (req, res) => {
  try {
    const { desde, hasta } = req.query; // Obtiene los parámetros de fecha
    // Valida que las fechas estén presentes
    if (!desde || !hasta) return res.status(400).json({ ok: false, msg: 'Parámetros desde y hasta requeridos' });

    // Busca los IDs de vehículos reservados en el rango de fechas
    const [reserved] = await pool.query(
      `SELECT DISTINCT vehicleId FROM reservations
       WHERE estado = 'activa'
       AND NOT (hasta < ? OR desde > ?)`,
      [desde, hasta]
    );

    const reservedIds = reserved.map(r => r.vehicleId);
    let query;
    let availableVehicles;

    // Construye la consulta para obtener vehículos no reservados
    if (reservedIds.length) {
      query = 'SELECT * FROM vehicles WHERE id NOT IN (?)';
      [availableVehicles] = await pool.query(query, [reservedIds]);
    } else {
      query = 'SELECT * FROM vehicles';
      [availableVehicles] = await pool.query(query);
    }

    res.json({ ok: true, vehicles: availableVehicles }); // Responde con la lista de vehículos disponibles
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, msg: 'Error interno' }); // Manejo de errores del servidor
  }
};

// Controlador para eliminar un vehículo (solo para administradores)
exports.delete = async (req, res) => {
  try {
    // Elimina el vehículo de la base de datos
    const [result] = await pool.query('DELETE FROM vehicles WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ ok: false, msg: 'No encontrado' });
    res.json({ ok: true, msg: 'Vehículo eliminado exitosamente' }); // Responde con un mensaje de éxito
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, msg: 'Error interno' }); // Manejo de errores del servidor
  }
};

// Importa la librería jsonwebtoken para verificar tokens JWT
const jwt = require('jsonwebtoken');
// Carga las variables de entorno desde el archivo .env
require('dotenv').config();

// Middleware de autenticación para verificar el token JWT en las peticiones
module.exports = (req, res, next) => {
  // Obtiene el encabezado de autorización de la petición
  const authHeader = req.headers.authorization;

  // Si no hay encabezado de autorización, devuelve un error de token faltante
  if (!authHeader) return res.status(401).json({ ok: false, msg: 'Token faltante' });

  // Extrae el token de la cadena 'Bearer TOKEN'
  const token = authHeader.split(' ')[1];

  try {
    // Verifica el token usando el secreto JWT configurado
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'tu_jwt_secreto');
    // Si el token es válido, decodifica el payload y lo adjunta al objeto de la petición (req.user)
    req.user = payload; // El payload contiene el id y el rol del usuario
    next(); // Continúa con la siguiente función middleware o controlador
  } catch (err) {
    // Si el token no es válido (expirado, mal formado, etc.), devuelve un error de token inválido
    return res.status(401).json({ ok: false, msg: 'Token inválido' });
  }
};

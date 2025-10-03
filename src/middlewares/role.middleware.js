// Middleware de autorización basado en roles
// Este middleware devuelve una función que verifica si el usuario autenticado tiene el rol requerido.
module.exports = (requiredRole) => (req, res, next) => {
  // Verifica si el usuario está autenticado (si req.user existe, significa que el middleware de autenticación ya se ejecutó)
  if (!req.user) return res.status(401).json({ ok: false, msg: 'No autenticado' });

  // Compara el rol del usuario autenticado con el rol requerido para acceder a la ruta
  if (req.user.rol !== requiredRole) return res.status(403).json({ ok: false, msg: 'No autorizado' });

  // Si el usuario tiene el rol requerido, continúa con la siguiente función middleware o controlador
  next();
};

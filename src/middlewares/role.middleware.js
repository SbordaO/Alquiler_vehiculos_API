module.exports = (requiredRole) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ ok: false, msg: 'No autenticado' });
  if (req.user.rol !== requiredRole) return res.status(403).json({ ok: false, msg: 'No autorizado' });
  next();
};

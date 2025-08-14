const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ ok: false, msg: 'Token faltante' });

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'tu_jwt_secreto');
    req.user = payload; // contiene id y rol
    next();
  } catch (err) {
    return res.status(401).json({ ok: false, msg: 'Token inválido' });
  }
};

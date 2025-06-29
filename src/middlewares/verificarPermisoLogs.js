// /middlewares/verificarPermisoLogs.js
module.exports = function verificarPermisoLogs(req, res, next) {
  const u = req.usuario;
  if (u.rol === "root" || u.rol === "admin" || u.permisos?.gestionarLogs) {
    return next();
  }

  console.warn(`❌ ${u.email} sin permiso para ver logs`);
  return res.status(403).json({ error: "No tenés permiso para ver logs" });
};

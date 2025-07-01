module.exports = function verificarPermisoLogs(req, res, next) {
  const u = req.usuario;

  if (u.rol === "root" || u.rol === "admin" || u.permisos?.gestionarLogs) {
    return next();
  }

  console.warn(`❌ Acceso denegado a logs: ${u.email}`);
  return res
    .status(403)
    .json({ error: "No tenés permiso para acceder a los registros de log." });
};
